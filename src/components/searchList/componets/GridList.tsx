import { WaterfallList } from 'components/largeList'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import React, { FunctionComponent as FC, useEffect, useRef } from 'react'
import { View } from 'react-native'

interface GridProps<T = any> {
  data: any[]
  renderItem?: (props: { item: T; index: number }) => JSX.Element
  headerHeight?: number
  scrollHandler?: any
  scrollClamp?: any
}
const HEIGHT = 100

const Grid: FC<GridProps> = (props) => {
  const { renderItem, headerHeight, scrollHandler } = props
  const { styles } = useResponsiveStyles(rStyle)
  const refScrollView = useRef<any>(null)

  useEffect(() => {
    refScrollView.current?.scrollTo({ y: props.scrollClamp.value, x: 0 })
  }, [])

  return (
    <WaterfallList
      ref={refScrollView}
      data={props.data}
      scrollHandler={scrollHandler}
      heightForItem={(item: any, index: number) => {
        'worklet'
        if (item.empty) {
          return 0
        }
        return HEIGHT
      }}
      renderItem={renderItem}
      numColumns={styles.numColumns.flex}
      renderHeader={() => <View style={{ height: headerHeight }} />}
    />
  )
}

const rStyle = StyleSheet.create({
  numColumns: {
    flex: '1 md:2 xl:3 xxl:4'
  }
})

export default Grid
