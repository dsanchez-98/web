/* eslint-disable prefer-promise-reject-errors */
import React, {
  FunctionComponent as FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { Animated, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { IndexPath, LargeListPropType, Layout, Offset } from '../../type'
import Group from './Group'
import Section from './Section'
import SpringScrollView from '../springScrollView'

export function idx<T = any>(f: () => T, defaultValue?: T | string): number {
  try {
    const res = f()
    return res === null || res === undefined || isNaN(res) ? defaultValue : res
  } catch (e) {
    return defaultValue
  }
}

interface Props extends LargeListPropType {}

const screenLayout = Dimensions.get('window')
const screenHeight = Math.max(screenLayout.width, screenLayout.height)

const useLargeList = (props: LargeListPropType) => {
  const [, updateState] = useState({})
  const forceUpdate = useCallback(() => updateState({}), [])
  const { renderHeader, renderFooter, heightForSection, groupCount } = props
  const _groupRefs = useRef(new Array(groupCount).fill(React.createRef()))
  const _offset = useRef(new Animated.Value(0))
  const _scrollView = useRef<ScrollView>(null)
  const _shouldUpdateContent = useRef(true)
  const _lastTick = useRef(0)
  const _contentOffsetY = useRef(props.initialContentOffset?.y || 0)
  const _headerLayout = useRef<Layout | undefined>()
  const _footerLayout = useRef<Layout | undefined>()
  const _nativeOffset = useRef<{ y: Animated.Value; x: Animated.Value }>({
    x: new Animated.Value(0),
    y: new Animated.Value(0)
  })
  const _size = useRef<Layout | undefined>()
  const _sectionRefs = useRef<React.RefObject<any>[]>([])
  const _orgOnHeaderLayout = useRef(() => 0)
  const _orgOnFooterLayout = useRef(() => 0)

  const obtainOffset = () => {
    _nativeOffset.current = {
      ..._nativeOffset.current,
      ...(props.onNativeContentOffsetExtract || {})
    }
    _offset.current = _nativeOffset.current.y
  }

  const _onScrollEnd = () => {
    _groupRefs.current.forEach((group) =>
      idx(() => group.current.contentConversion(_contentOffsetY.current))
    )
    idx(() =>
      _sectionRefs.current.forEach((sectionRef) => {
        sectionRef.current.updateOffset(_contentOffsetY.current)
      })
    )
    props.onMomentumScrollEnd?.()
  }

  const _onScroll = (e: any) => {
    try {
      const offsetY = e.nativeEvent.contentOffset.y
      _contentOffsetY.current = offsetY
      _shouldUpdateContent.current &&
        idx(() =>
          _sectionRefs.current.forEach((sectionRef) => {
            sectionRef.current.updateOffset(_contentOffsetY.current)
          })
        )
      const now = new Date().getTime()
      props.onScroll?.(e)
      if (_lastTick.current - now > 30) {
        _lastTick.current = now
        return
      }
      _lastTick.current = now
      _shouldUpdateContent.current &&
        _groupRefs.current.forEach((group) =>
          idx(() => group.current.contentConversion(offsetY))
        )
    } catch (error) {}
  }

  const scrollTo = (offset: Offset, animated: boolean = true) => {
    if (!_scrollView.current) {
      return Promise.reject('LargeList has not been initialized yet!')
    }

    _shouldUpdateContent.current = false
    _groupRefs.current.forEach((group) =>
      idx(() => group.current.contentConversion(offset.y))
    )
    _sectionRefs.current.forEach((sectionRef) =>
      idx(() => sectionRef.current.updateOffset(offset.y))
    )
    return _scrollView.current.scrollTo(offset, animated).then(() => {
      _shouldUpdateContent.current = true
      return Promise.resolve()
    })
  }

  const scrollToIndexPath = (indexPath: IndexPath, animated: boolean = true) => {
    const { data, heightForIndexPath } = props
    let ht = idx(() => _headerLayout.current?.height, 0)
    for (let s = 0; s < data.length && s <= indexPath.section; ++s) {
      if (indexPath.section === s && indexPath.row === -1) break
      ht += heightForSection(s)
      for (let r = 0; r < data[s].items.length; ++r) {
        if (indexPath.section === s && indexPath.row === r) break
        ht += heightForIndexPath({ section: s, row: r })
      }
    }
    return scrollTo({ x: 0, y: ht }, animated)
  }

  const endRefresh = () => {
    idx(() => _scrollView.current!.endRefresh())
  }

  const endLoading = () => {
    idx(() => _scrollView.current!.endLoading())
  }

  const _shouldRenderContent = () => {
    return (
      _size.current &&
      (!renderHeader || !renderHeader() || _headerLayout.current) &&
      (!renderFooter || !renderFooter() || _footerLayout.current)
    )
  }

  const _onSizeChange = (size) => {
    console.log('size', size)
    _size.current = size
    props.onSizeChange?.(size)
    if (_shouldRenderContent()) forceUpdate()
  }
  useEffect(() => {
    obtainOffset()
  }, [props.onNativeContentOffsetExtract])

  return {
    _scrollView,
    _headerLayout,
    _size,
    _footerLayout,
    _sectionRefs,
    _onSizeChange,
    _shouldRenderContent,
    _offset,
    _nativeOffset,
    _onScroll,
    _onScrollEnd,
    _groupRefs,
    _contentOffsetY,
    _orgOnHeaderLayout,
    _orgOnFooterLayout,
    scrollToIndexPath,
    endRefresh,
    endLoading
  }
}

type Params = {
  headerLayout?: Layout
  size?: Layout
  groupCount: number
  heightForSection: (section: number) => number
  heightForIndexPath: (indexPath: IndexPath) => number
  data: any[]
  groupMinHeight: number
  headerStickyEnabled?: boolean
}
const getSectionAndRows = (params: Params) => {
  const headerLayout = params.headerLayout
  const size = params.size
  const groupCount = params.groupCount
  const heightForSection = params.heightForSection
  const heightForIndexPath = params.heightForIndexPath
  const data = params.data
  const groupMinHeight = params.groupMinHeight
  const headerStickyEnabled = params.headerStickyEnabled

  const groupIndexes: IndexPath[][][] = []
  const inputs: number[][] = []
  const outputs: number[][] = []
  const sectionInputs: number[][] = []
  const sectionOutputs: number[][] = []
  const sectionIndexes: number[][] = []
  const sections = [0]
  let sumHeight = headerLayout?.height || 0
  const wrapperHeight = idx(() => size!.height, 700)

  const sectionTops: number[] = []
  const sectionHeights: number[] = []
  const lastOffset: number[] = []
  let indexes: IndexPath[] = []
  let currentGroupIndex = 0
  let currentGroupHeight = 0
  const headerHeight = headerLayout?.height || 0

  for (let i = 0; i < groupCount!; ++i) {
    inputs.push(i === 0 ? [Number.MIN_SAFE_INTEGER] : [])
    outputs.push(i === 0 ? [sumHeight] : [])
    lastOffset.push(sumHeight)
    groupIndexes.push([])
  }
  for (let section = 0; section < data.length; ++section) {
    for (let row = -1; row < data[section].items.length; ++row) {
      let height
      if (row === -1) {
        height = heightForSection(section)
        sectionHeights.push(height)
        sectionTops[section] = sumHeight
      } else {
        height = heightForIndexPath({ section: section, row: row })
      }
      currentGroupHeight += height
      sumHeight += height
      indexes.push({ section: section, row: row })
      if (
        currentGroupHeight >= groupMinHeight ||
        (section === data.length - 1 && row === data[section].items.length - 1)
      ) {
        groupIndexes[currentGroupIndex].push(indexes)
        indexes = []
        currentGroupHeight = 0
        currentGroupIndex++
        currentGroupIndex %= groupCount
        if (section === data.length - 1 && row === data[section].items.length - 1) {
          break
        }
        if (inputs[currentGroupIndex].length === 0) {
          inputs[currentGroupIndex].push(Number.MIN_SAFE_INTEGER)
        }
        inputs[currentGroupIndex].push(sumHeight - wrapperHeight)
        inputs[currentGroupIndex].push(sumHeight + 0.1 - wrapperHeight)
        if (outputs[currentGroupIndex].length === 0) {
          outputs[currentGroupIndex].push(sumHeight)
          outputs[currentGroupIndex].push(sumHeight)
        } else {
          outputs[currentGroupIndex].push(lastOffset[currentGroupIndex])
        }
        outputs[currentGroupIndex].push(sumHeight)
        lastOffset[currentGroupIndex] = sumHeight
      }
    }
  }
  inputs.forEach((range) => range.push(Number.MAX_SAFE_INTEGER))
  outputs.forEach((range) => range.push(range[range.length - 1]))
  const viewport: number[] = []

  sectionTops.forEach((top) => {
    const first = viewport[0]
    if (first !== undefined && top - first > screenHeight) {
      viewport.splice(0, 1)
    }
    viewport.push(top)
    if (sections.length < viewport.length + 1) sections.push(sections.length)
  })

  // _sectionRefs.current = []
  sections.forEach(() => {
    sectionInputs.push([])
    sectionOutputs.push([])
    sectionIndexes.push([])
    // _sectionRefs.current.push(React.createRef())
  })
  for (let section = 0; section < data.length; section++) {
    const index = section % sections.length
    const first = sectionInputs[index].length <= 0
    sectionInputs[index].push(
      first
        ? sectionTops[section] - 1 - headerHeight
        : sectionInputs[index][sectionInputs[index].length - 1] + 0.1,
      sectionTops[section] - Math.min(headerHeight, wrapperHeight),
      sectionTops[section]
    )
    sectionIndexes[index].push(section, section, section)
    sectionOutputs[index].push(
      sectionTops[section],
      sectionTops[section],
      sectionTops[section]
    )
    if (section + 1 < data.length) {
      sectionInputs[index].push(
        sectionTops[section + 1] - sectionHeights[section],
        sectionTops[section + 1]
      )
      sectionIndexes[index].push(section, section)
      sectionOutputs[index].push(
        sectionTops[section + 1] - sectionHeights[section],
        sectionTops[section + 1] - sectionHeights[section]
      )
    } else {
      const last = sectionTops[section] + sectionHeights[section]
      sectionInputs[index].push(last)
      sectionIndexes[index].push(section)
      sectionOutputs[index].push(last)
    }
  }
  if (headerStickyEnabled) {
    if (headerHeight >= wrapperHeight) {
      console.error(
        'WrapperHeight must be larger than largelist header height when headerStickyEnabled is enabled'
      )
    }
    sectionInputs.forEach((inputs) =>
      inputs.forEach((input, index) => {
        const mod = index % 5
        if (mod > 1 && mod < 4) {
          inputs[index] -= idx(() => headerLayout!.height, 0)
        }
      })
    )
  }
  sectionInputs.forEach((inputs, index) => {
    while (inputs.length > 1 && inputs[inputs.length - 1] === inputs[inputs.length - 2]) {
      inputs.splice(inputs.length - 1, 1)
      sectionIndexes[index].splice(sectionIndexes[index].length - 1, 1)
      sectionOutputs[index].splice(sectionOutputs[index].length - 1, 1)
    }
  })

  return {
    inputs,
    outputs,
    sectionInputs,
    sectionOutputs,
    sectionIndexes,
    groupIndexes,
    sections,
    sumHeight,
    wrapperHeight
  }
}

const LargeList: FC<Props> = (props) => {
  const {
    data,
    headerStickyEnabled,
    heightForSection,
    heightForIndexPath,
    groupCount,
    groupMinHeight
  } = props

  const {
    _scrollView,
    _headerLayout,
    _size,
    _footerLayout,
    _sectionRefs,
    _onSizeChange,
    _offset,
    _nativeOffset,
    _onScroll,
    _onScrollEnd,
    _groupRefs,
    _contentOffsetY,
    _shouldRenderContent
  } = useLargeList(props)

  let {
    groupIndexes,
    inputs,
    outputs,
    sectionIndexes,
    sectionInputs,
    sectionOutputs,
    sections,
    sumHeight,
    wrapperHeight
  } = getSectionAndRows({
    data,
    groupCount: groupCount!,
    groupMinHeight: groupMinHeight!,
    heightForIndexPath,
    heightForSection: heightForSection!,
    headerLayout: _headerLayout.current,
    headerStickyEnabled,
    size: _size.current
  })

  _sectionRefs.current = []
  sections.forEach(() => {
    _sectionRefs.current.push(React.createRef())
  })

  const shouldRenderContent = _shouldRenderContent()

  if (_footerLayout.current) sumHeight += _footerLayout.current.height
  const contentStyle =
    sumHeight > 0
      ? {
          height:
            sumHeight > wrapperHeight
              ? sumHeight
              : wrapperHeight + StyleSheet.hairlineWidth
        }
      : null
  return (
    <SpringScrollView
      {...props}
      onSizeChange={_onSizeChange}
      contentStyle={StyleSheet.flatten([props.contentStyle, contentStyle])}
      onNativeContentOffsetExtract={_nativeOffset.current}
      onScroll={_onScroll}
      // onMomentumScrollEnd={this._onScrollEnd}
    >
      {shouldRenderContent &&
        groupIndexes.map((indexes, index) => {
          let transform
          if (inputs[index].length > 1) {
            transform = [
              {
                translateY: _offset.current.interpolate({
                  inputRange: inputs[index],
                  outputRange: outputs[index]
                })
              }
            ]
          }
          const style = StyleSheet.flatten([styles.abs, { transform }])
          return (
            <Animated.View key={index} style={style}>
              <Group
                {...props}
                index={index}
                ref={_groupRefs.current[index]}
                indexes={indexes}
                input={inputs[index]}
                output={outputs[index]}
                offset={_contentOffsetY.current}
              />
            </Animated.View>
          )
        })}
      {shouldRenderContent &&
        sections.map((value, index) => {
          let transform
          if (sectionInputs[index].length > 1) {
            transform = [
              {
                translateY: _offset.current.interpolate({
                  inputRange: sectionInputs[index],
                  outputRange: sectionOutputs[index]
                })
              }
            ]
          }
          const style = StyleSheet.flatten([styles.abs, { transform }])
          return (
            <Section
              {...props}
              key={index}
              ref={_sectionRefs.current[index]}
              style={style}
              input={sectionInputs[index]}
              output={sectionOutputs[index]}
              sectionIndexes={sectionIndexes[index]}
              offset={_contentOffsetY.current}
            />
          )
        })}
    </SpringScrollView>
  )
}

LargeList.defaultProps = {
  heightForSection: () => 0,
  heightForIndexPath: () => 0,
  renderSection: () => null,
  groupCount: 4,
  groupMinHeight: screenHeight / 3
}

export const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  abs: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  leftTop: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  wrapperStyle: {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'scroll'
  }
})

export default LargeList
