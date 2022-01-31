import { Animated, ViewProps, ViewStyle } from 'react-native'
import { RefreshHeader } from './RefreshHeader'
import { LoadingFooter } from './LoadingFooter'
import { ScrollHandlers, Context } from 'components/reanimated'

export interface IndexPath {
  section: number
  row: number
}

export interface Offset {
  x: number
  y: number
}

export interface NativeContentOffset {
  x?: Animated.Value
  y?: Animated.Value
}

export type RefreshStyle = 'topping' | 'stickyScrollView' | 'stickyContent'

export type LoadingStyle = 'bottoming' | 'stickyScrollView' | 'stickyContent'

export type RefreshStatus =
  | 'refreshing'
  | 'pulling'
  | 'pullingEnough'
  | 'pullingCancel'
  | 'waiting'

export type LoadingStatus =
  | 'loading'
  | 'dragging'
  | 'draggingEnough'
  | 'draggingCancel'
  | 'waiting'

export interface ScrollEvent {
  nativeEvent: {
    contentOffset: {
      x: number
      y: number
    }
    refreshStatus: RefreshStatus
    loadingStatus: LoadingStatus
  }
}

type Size = { width: number; height: number }
export interface SpringScrollViewPropType extends ViewProps {
  style?: ViewStyle
  contentStyle?: ViewStyle
  bounces?: boolean
  scrollEnabled?: boolean
  directionalLockEnabled?: boolean
  initialContentOffset?: Offset
  showsVerticalScrollIndicator?: boolean
  showsHorizontalScrollIndicator?: boolean
  refreshHeader?: typeof RefreshHeader
  loadingFooter?: typeof LoadingFooter
  onRefresh?: () => void
  onLoading?: () => void
  allLoaded?: boolean
  textInputRefs?: any[]
  inputToolBarHeight?: number
  tapToHideKeyboard?: boolean
  onTouchBegin?: () => void
  onTouchEnd?: () => void
  inverted?: boolean
  onMomentumScrollBegin?: () => void
  onMomentumScrollEnd?: () => void
  onScroll?: (evt: ScrollEvent) => void
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled'
  onNativeContentOffsetExtract?: NativeContentOffset
  onSizeChange?: (size: Size) => void
  onContentSizeChange?: (size: Size) => void
  scrollHandler?: <TContext extends Context>() => ScrollHandlers<TContext>
  innerRef: React.MutableRefObject<any>
}
