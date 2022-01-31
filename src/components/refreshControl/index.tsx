import React from 'react'
import { FlatList, Platform, ScrollView } from 'react-native'
import CustomRefreshControl from './RefreshControl'
import { RefreshControlProps } from './types'

export { CustomRefreshControl as RefreshControl }
export function patchFlatListProps(options = {}) {
  try {
    if (Platform.OS === 'web') {
      setCustomFlatListWeb(options)
    }
  } catch (e) {
    console.error(e)
  }
}

const List = FlatList as any
function setCustomFlatListWeb(options: RefreshControlProps) {
  List.defaultProps = {
    ...List.defaultProps,
    renderScrollComponent: (props: any) => (
      <ScrollView
        {...props}
        refreshControl={
          <CustomRefreshControl
            {...options}
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
          />
        }
      />
    )
  }
}
