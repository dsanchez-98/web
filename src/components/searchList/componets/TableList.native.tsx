import React, { FunctionComponent as FC } from 'react'
import { View } from 'react-native'
import { FlatList } from 'components/largeList'
import { TableListProps } from '../types'

const HEIGHT = 120
const CONTAINER_HEIGHT = 80

const TableList: FC<TableListProps<any>> = (props) => {
  return (
    <FlatList
      ref={props.innerRef}
      data={props.data}
      scrollHandler={props.scrollHandler}
      contentStyle={{
        // ...shadow,
        marginHorizontal: 15
      }}
      showsHorizontalScrollIndicator={props.showsVerticalScrollIndicator}
      showsVerticalScrollIndicator={props.showsVerticalScrollIndicator}
      heightForItem={() => {
        'worklet'
        return HEIGHT
      }}
      renderItem={({ item, index }) => {
        return <View style={{ height: HEIGHT }}></View>
      }}
      renderHeader={() => <View style={{ height: props.headerHeight }} />}
    />
  )
}

export default TableList
