import { runOnJS, useSharedValue } from 'components/reanimated'
import React, {
  forwardRef,
  ForwardRefRenderFunction as FC,
  MutableRefObject,
  useCallback,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { Layout, Offset, WaterfallListProps } from '../../type'
import Item from './Item'
import SpringScrollView from './../springScrollView'

export function idx(f: () => any, defaultValue = 0): number {
  'worklet'
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
const useWaterfalList = (props: WaterfallListProps) => {
  const [, updateState] = useState({})
  const forceUpdate = useCallback(() => updateState({}), [])
  const _size = useRef<Layout>()
  const _headerLayout = useRef<Layout>()
  const _footerLayout = useRef<Layout>()
  const _emptyLayout = useRef<Layout>()
  const _offset = useSharedValue(0)
  const _itemRefs = useRef<MutableRefObject<any>[][]>([])
  const _scrollView = useRef<any>(null)
  const _orgOnHeaderLayout = useRef((e: any) => {})
  const _orgOnEmptyLayout = useRef((e: any) => {})
  const _lastTick = useSharedValue(0)
  const _shouldUpdateContent = useSharedValue(true)

  const _onScroll = (e: any) => {
    // _offset.value = e.nativeEvent.contentOffset.y
    const now = new Date().getTime()
    if (_lastTick.value - now > 30) {
      _lastTick.value = now
      return
    }
    _lastTick.value = now
    _shouldUpdateContent.value &&
      _itemRefs.current.forEach((column) =>
        column.forEach((itemRef) =>
          idx(() => itemRef.current.updateOffset(e.nativeEvent.contentOffset.y))
        )
      )
    _shouldUpdateContent.value && props.onScroll?.(e)
  }

  const _shouldRenderContent = () => {
    const { renderHeader, renderFooter, renderEmpty } = props
    return (
      _size.current &&
      (!renderHeader || _headerLayout.current) &&
      (!renderFooter || _footerLayout.current) &&
      (!renderEmpty || _emptyLayout.current)
    )
  }

  const _onSizeChange = (s: Layout) => {
    if (_size.current) {
      return
    }
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

  const _onEmptyLayout = (e: any) => {
    if (
      _emptyLayout.current &&
      _emptyLayout.current.height === e.nativeEvent.layout.height
    ) {
      return
    }
    _emptyLayout.current = e.nativeEvent.layout
    _orgOnEmptyLayout.current && _orgOnEmptyLayout.current(e)
    if (_shouldRenderContent()) forceUpdate()
  }

  const scrollHandler = () => {
    'worklet'
    return {
      onScroll: (e: any, ctx: any) => {
        'worklet'
        _offset.value = e.contentOffset.y
        props.scrollHandler?.().onScroll?.(e, ctx)
        runOnJS(_onScroll)({ nativeEvent: e })
      }
    }
  }

  const scrollTo = (offset: Offset, animated: boolean = true) => {
    _scrollView.current.scrollTo(offset, animated)
  }

  return {
    _scrollView,
    _itemRefs,
    _size,
    _offset,
    _headerLayout,
    _footerLayout,
    _onSizeChange,
    _shouldRenderContent,
    _orgOnHeaderLayout,
    _orgOnEmptyLayout,
    _onHeaderLayout,
    _onEmptyLayout,
    _onScroll,
    scrollHandler,
    scrollTo
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

const WaterfallList: FC<ReturnType<typeof useWaterfalList>, WaterfallListProps> = (
  props,
  ref
) => {
  const { numColumns = 1, heightForItem, data, preferColumnWidth } = props
  const params = useWaterfalList(props)
  const {
    _scrollView,
    _onSizeChange,
    _itemRefs,
    _size,
    _offset,
    _headerLayout,
    _footerLayout,
    _shouldRenderContent,
    _orgOnHeaderLayout,
    _orgOnEmptyLayout,
    _onHeaderLayout,
    _onEmptyLayout,
    scrollHandler
  } = params
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
    const header = React.Children.only(renderHeader()) as any
    _orgOnHeaderLayout.current = header.onLayout
    return React.cloneElement(header, {
      style: StyleSheet.flatten([header.props.style, transform]),
      onLayout: _onHeaderLayout
    })
  }

  const _renderEmpty = () => {
    const { renderEmpty } = props
    if (!renderEmpty) return null
    const empty = React.Children.only(renderEmpty()) as any
    _orgOnEmptyLayout.current = empty.onLayout
    const transform = {
      transform: [{ translateY: _shouldRenderContent() ? 0 : 10000 }]
    }
    return React.cloneElement(empty, {
      style: StyleSheet.flatten([empty.props.style, transform]),
      onLayout: _onEmptyLayout
    })
  }

  useImperativeHandle(ref, () => params)

  return (
    <SpringScrollView
      {...props}
      innerRef={_scrollView}
      onSizeChange={_onSizeChange}
      contentStyle={{ ...props.contentStyle, height: sumHeight }}
      scrollHandler={scrollHandler}
    >
      {_renderHeader()}
      {!props.data.length && _renderEmpty()}
      {columnSummaries.map((summary, index) =>
        summary.itemIndexes.map((_, cellIndex) => (
          <Item
            {...props}
            index={index}
            key={summary.inputItemIndexes[cellIndex][0]}
            ref={_itemRefs.current[index][cellIndex]}
            itemIndexes={summary.inputItemIndexes[cellIndex]}
            input={summary.inputs[cellIndex]}
            output={summary.outputs[cellIndex]}
            wrapperWidth={wrapperWidth}
            numColumns={numColumns}
            style={styles.leftTop}
            animatedOffset={_offset}
          />
        ))
      )}
    </SpringScrollView>
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
    top: 0,
    right: 0
  }
})

export default forwardRef(WaterfallList)
