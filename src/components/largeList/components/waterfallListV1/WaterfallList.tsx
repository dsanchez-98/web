import React, {
  FunctionComponent as FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  Animated,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native'
import { Layout } from '../../type'
import { WaterfallItem } from './WaterfallItem'

interface Props<T = any> extends ScrollViewProps {
  data: T[]
  heightForItem: (item: T, index: number) => number
  numColumns?: number
  preferColumnWidth?: number
  onNativeContentOffsetExtract?: { y?: Animated.Value; x?: Animated.Value }
  renderHeader: () => JSX.Element
  renderFooter: () => JSX.Element
  renderItem?: (item: { item: T; index: number }) => JSX.Element
}

export function idx<T = any>(f: () => T, defaultValue?: T | string): number {
  try {
    const res = f()
    return res === null || res === undefined || isNaN(res) ? defaultValue : res
  } catch (e) {
    return defaultValue
  }
}

const screenLayout = Dimensions.get('window')
const screenHeight = Math.max(screenLayout.width, screenLayout.height)

type ColumnSumary = {
  sumHeight: number
  indexes: number[]
  tops: number[]
  heights: number[]
  cells: number[]
  inputs: number[][]
  outputs: number[][]
  itemIndexes: number[][]
  inputItemIndexes: number[][]
}
const useWaterfalList = (props: Props) => {
  const [, updateState] = useState({})
  const forceUpdate = useCallback(() => updateState({}), [])

  const _size = useRef<Layout>()
  const _headerLayout = useRef<Layout>()
  const _footerLayout = useRef<Layout>()
  const _contentOffsetY = useRef(0)
  const _nativeOffset = useRef<{ y: Animated.Value; x: Animated.Value }>({
    x: new Animated.Value(0),
    y: new Animated.Value(0)
  })
  const _offset = useRef(new Animated.Value(0))
  const _itemRefs = useRef<MutableRefObject<any>[][]>([])
  const _shouldUpdateContent = useRef(true)
  const _scrollView = useRef<ScrollView>(null)
  const _lastTick = useRef(0)
  const _orgOnHeaderLayout = useRef(() => {})

  const obtainOffset = () => {
    _nativeOffset.current = {
      ..._nativeOffset.current,
      ...(props.onNativeContentOffsetExtract || {})
    }
    _offset.current = _nativeOffset.current.y
  }

  const _onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    _contentOffsetY.current = e.nativeEvent.contentOffset.y
    const now = new Date().getTime()
    if (_lastTick.current - now > 30) {
      _lastTick.current = now
      return
    }
    _lastTick.current = now
    _shouldUpdateContent.current &&
      _itemRefs.current.forEach((column) => {
        column.forEach((itemRef) =>
          idx(() => itemRef.current.updateOffset(_contentOffsetY.current))
        )
      })
    _shouldUpdateContent && props.onScroll?.(e)
  }

  const _shouldRenderContent = () => {
    const { renderHeader, renderFooter } = props
    return (
      _size.current &&
      (!renderHeader || _headerLayout.current) &&
      (!renderFooter || _footerLayout.current)
    )
  }

  const _onSizeChange = (s: Layout) => {
    _size.current = s
    if (_shouldRenderContent()) forceUpdate()
  }

  const _onHeaderLayout = (e: any) => {
    if (
      _headerLayout.current &&
      _headerLayout.current.height === e.nativeEvent.layout.height
    ) {
      return
    }
    _headerLayout.current = e.nativeEvent.layout
    _orgOnHeaderLayout.current && _orgOnHeaderLayout.current(e)
    if (_shouldRenderContent()) forceUpdate()
  }

  useEffect(() => {
    obtainOffset()
  }, [props.onNativeContentOffsetExtract])

  return {
    _scrollView,
    _onScroll,
    _nativeOffset,
    _itemRefs,
    _contentOffsetY,
    _size,
    _offset,
    _headerLayout,
    _footerLayout,
    _onSizeChange,
    _shouldRenderContent,
    _orgOnHeaderLayout,
    _onHeaderLayout
  }
}

type GetColumns = {
  size: Layout
  numColumns: number
  preferColumnWidth?: number
  headerLayout: Layout
  footerLayout: Layout
  data: any[]
  heightForItem: (item: any, index: number) => number
}

const getColumns = (params: GetColumns) => {
  const size = params.size
  let numColumns = params.numColumns
  const headerLayout = params.headerLayout
  const preferColumnWidth = params.preferColumnWidth
  const footerLayout = params.footerLayout
  const data = params.data
  const heightForItem = params.heightForItem

  const columnSummaries: ColumnSumary[] = []
  let sumHeight = idx(() => headerLayout.height, 0)

  if (preferColumnWidth) {
    numColumns = Math.floor(size.width / preferColumnWidth)
  }

  for (let i = 0; i < numColumns; ++i) {
    columnSummaries.push({
      sumHeight: 0,
      indexes: [],
      tops: [],
      heights: [],
      cells: [],
      inputs: [],
      outputs: [],
      itemIndexes: [],
      inputItemIndexes: []
    })
  }
  data.forEach((item, index) => {
    const height = heightForItem(item, index)
    let minHeight = Number.MAX_SAFE_INTEGER
    let minHeightIndex = 0
    columnSummaries.forEach((summary, idx) => {
      if (minHeight > summary.sumHeight) {
        minHeight = summary.sumHeight
        minHeightIndex = idx
      }
    })
    const lastHeight = idx(
      () =>
        columnSummaries[minHeightIndex].heights[
          columnSummaries[minHeightIndex].heights.length - 1
        ],
      0
    )
    columnSummaries[minHeightIndex].sumHeight += height
    columnSummaries[minHeightIndex].heights.push(height)
    columnSummaries[minHeightIndex].indexes.push(index)
    const lastTop = idx(
      () =>
        columnSummaries[minHeightIndex].tops[
          columnSummaries[minHeightIndex].tops.length - 1
        ],
      idx(() => headerLayout.height, 0)
    )
    columnSummaries[minHeightIndex].tops.push(lastTop + lastHeight)
  })
  let maxHeight = Number.MIN_SAFE_INTEGER
  columnSummaries.forEach((summary) => {
    if (maxHeight < summary.sumHeight) {
      maxHeight = summary.sumHeight
    }
    const viewport: any[] = []
    summary.tops.forEach((top, index) => {
      const first = viewport[0]
      if (first !== undefined && top + summary.heights[index] - first > screenHeight) {
        viewport.splice(0, 1)
      }
      viewport.push(top)
      while (summary.cells.length < viewport.length + 2) {
        summary.cells.push(summary.cells.length)
      }
    })
  })
  sumHeight += maxHeight
  sumHeight += idx(() => footerLayout.height, 0)
  if (sumHeight <= size.height) {
    sumHeight = size.height + StyleSheet.hairlineWidth
  }
  columnSummaries.forEach((summary) => {
    summary.indexes.forEach((itemIndex, index) => {
      const cellIndex = index % summary.cells.length
      if (!summary.inputs[cellIndex]) {
        summary.inputs[cellIndex] = [Number.MIN_SAFE_INTEGER]
        summary.inputItemIndexes[cellIndex] = [itemIndex]
      }
      if (!summary.outputs[cellIndex]) {
        summary.outputs[cellIndex] = [idx(() => summary.tops[index], 0)]
      }
      if (!summary.itemIndexes[cellIndex]) summary.itemIndexes[cellIndex] = []
      summary.inputs[cellIndex].push(
        summary.tops[index] - size.height,
        summary.tops[index] - size.height + 0.1
      )
      summary.inputItemIndexes[cellIndex].push(itemIndex, itemIndex)
      summary.outputs[cellIndex].push(
        summary.outputs[cellIndex][summary.outputs[cellIndex].length - 1]
      )
      summary.outputs[cellIndex].push(
        idx(
          () => summary.tops[index],
          summary.outputs[cellIndex][summary.outputs[cellIndex].length - 1]
        )
      )
      summary.itemIndexes[cellIndex].push(itemIndex)
    })
    summary.inputs.forEach((inputs, index) => {
      inputs.push(Number.MAX_SAFE_INTEGER)
      summary.inputItemIndexes[index].push(
        summary.inputItemIndexes[index][summary.inputItemIndexes[index].length - 1]
      )
    })
    summary.outputs.forEach((outputs) => outputs.push(outputs[outputs.length - 1]))
  })

  return { data: columnSummaries, sumHeight }
}

const WaterfallList: FC<Props> = (props) => {
  const { numColumns = 1, heightForItem, data, preferColumnWidth } = props
  const {
    _scrollView,
    _onScroll,
    _nativeOffset,
    _onSizeChange,
    _itemRefs,
    _contentOffsetY,
    _size,
    _offset,
    _headerLayout,
    _footerLayout,
    _shouldRenderContent,
    _orgOnHeaderLayout,
    _onHeaderLayout
  } = useWaterfalList(props)

  let columnSummaries: ColumnSumary[] = []
  let sumHeight = 0
  let wrapperWidth: number

  if (_shouldRenderContent()) {
    wrapperWidth = _size.current!.width / numColumns
    _itemRefs.current = []
    const col = getColumns({
      data,
      footerLayout: _footerLayout.current!,
      headerLayout: _headerLayout.current!,
      size: _size.current!,
      numColumns,
      preferColumnWidth,
      heightForItem
    })
    columnSummaries = col.data
    sumHeight = col.sumHeight
    columnSummaries.forEach((summary) => {
      const itemRefs: any[] = []
      summary.itemIndexes.forEach(() => {
        itemRefs.push(React.createRef())
      })
      _itemRefs.current.push(itemRefs)
    })
  }

  const _renderHeader = () => {
    const { renderHeader } = props
    if (!renderHeader) return null
    const transform = {
      transform: [{ translateY: _shouldRenderContent() ? 0 : 10000 }]
    }
    const header = React.Children.only(renderHeader())
    _orgOnHeaderLayout.current = header.onLayout
    return React.cloneElement(header, {
      style: StyleSheet.flatten([header.props.style, transform]),
      onLayout: _onHeaderLayout
    })
  }

  return (
    <ScrollView
      {...props}
      ref={_scrollView}
      onLayout={({ nativeEvent: { layout } }) => {
        _onSizeChange(layout)
      }}
      contentContainerStyle={[props.contentContainerStyle, { height: sumHeight }]}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: _nativeOffset.current
            }
          }
        ],
        {
          useNativeDriver: false,
          listener: _onScroll
        }
      )}
      scrollEventThrottle={1}
    >
      {_renderHeader()}
      {columnSummaries.map((summary, index) =>
        summary.itemIndexes.map((itemIndex, cellIndex) => (
          <WaterfallItem
            {...props}
            key={summary.inputItemIndexes[cellIndex][0]}
            ref={_itemRefs.current[index][cellIndex]}
            offset={_contentOffsetY.current}
            itemIndexes={summary.inputItemIndexes[cellIndex]}
            input={summary.inputs[cellIndex]}
            output={summary.outputs[cellIndex]}
            style={StyleSheet.flatten([
              styles.leftTop,
              {
                width: wrapperWidth,
                transform: [
                  {
                    translateY: _offset.current.interpolate({
                      inputRange: summary.inputs[cellIndex],
                      outputRange: summary.outputs[cellIndex]
                    })
                  },
                  { translateX: wrapperWidth * index }
                ]
              }
            ])}
          />
        ))
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
  }
})

export default WaterfallList
