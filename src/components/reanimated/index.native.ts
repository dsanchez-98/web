import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import Animated from 'react-native-reanimated'

export function getStyle(style: any) {
  'worklet'
  return style
}
export { withTiming as withTimingNative } from 'react-native-reanimated'
export {
  withTiming,
  interpolate,
  interpolateColor,
  useSharedValue,
  useValue,
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useAnimatedRef,
  useDerivedValue,
  withDecay,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  runOnJS,
  Value,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useCode,
  useWorkletCallback,
  makeMutable,
  cancelAnimation,
  Extrapolate,
  diffClamp
} from 'react-native-reanimated'

export type Context = Record<string, unknown>

export type OnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => void

export type ScrollHandler<TContext extends Context> = (
  event: NativeScrollEvent,
  context: TContext
) => void

export interface ScrollHandlers<TContext extends Context> {
  onScroll?: ScrollHandler<TContext>
  onBeginDrag?: ScrollHandler<TContext>
  onEndDrag?: ScrollHandler<TContext>
  onMomentumBegin?: ScrollHandler<TContext>
  onMomentumEnd?: ScrollHandler<TContext>
}

export default Animated
