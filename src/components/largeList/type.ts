import Animated, { ScrollHandlers, Context } from 'components/reanimated'
import React from 'react'
import { ScrollViewProps, ViewStyle } from 'react-native'

export type LargeListDataType = { items: any[] }[]

export interface IndexPath {
  section: number
  row: number
}
export interface WaterfallListProps<T = any> extends ScrollViewProps {
  data: T[]
  heightForItem: (item: T, index: number) => number
  numColumns?: number
  preferColumnWidth?: number
  onNativeContentOffsetExtract?: {
    y?: Animated.SharedValue<number>
    x?: Animated.SharedValue<number>
  }
  renderHeader?: () => JSX.Element
  renderFooter?: () => JSX.Element
  renderEmpty?: () => JSX.Element
  renderItem?: (item: { item: T; index: number }) => JSX.Element
  scrollHandler?: <TContext extends Context>() => ScrollHandlers<TContext>
  contentStyle?: ViewStyle
}

export interface WaterfallItemProps extends WaterfallListProps {
  index: number
  input: number[]
  output: number[]
  itemIndexes: number[]
  wrapperWidth: number
  animatedOffset: Animated.SharedValue<number>
}

export interface LargeListPropType {
  data: LargeListDataType
  headerStickyEnabled?: boolean
  contentStyle?: ViewStyle
  directionalLockEnabled?: boolean
  renderScaleHeaderBackground?: () => React.ReactElement<any>
  heightForSection?: (section: number) => number
  renderSection?: (section: number) => React.ReactNode
  heightForIndexPath: (indexPath: IndexPath) => number
  renderIndexPath: (indexPath: IndexPath) => React.ReactNode
  renderHeader?: () => React.ReactElement<any>
  renderFooter?: () => React.ReactElement<any>
  renderEmpty?: () => React.ReactElement<any>
  inverted?: boolean
  groupCount?: number
  groupMinHeight?: number
  updateTimeInterval?: number
  initialContentOffset?: {
    x: number
    y: number
  }
}

export interface Offset {
  x: number
  y: number
}

export interface SectionPropType {
  tops: number[]
  section: number
  nativeOffset: Animated.SharedValue<number>
  heightForSection: (section: number) => number
  renderSection?: (section: number) => React.ReactNode
  input: number[]
  output: number[]
  sectionIndexes: number[]
  offset: number
  inverted?: boolean
  data: LargeListDataType
}

export type Layout = {
  height: number
  width: number
}
