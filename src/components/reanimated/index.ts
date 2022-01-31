/* eslint-disable no-extra-semi */
import {
  ImageStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  TextStyle,
  ViewStyle
} from 'react-native'
import Animated, * as reanimated from 'react-native-reanimated'
import { kebabCase } from 'helpers'
const {
  withTiming: withTimingNative,
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
  diffClamp,
  scrollTo,
  FadeIn
} = reanimated
export const withTiming = (toValue: number, configs?: any, callback?: () => void) => {
  callback &&
    setTimeout(() => {
      callback()
    }, 300)
  return withTimingNative(toValue, { ...configs, duration: 0 })
}
const isWeb = Platform.OS === 'web'
export const easing = 'cubic-bezier(0.45, 0, 0.55, 1)'
export const duration = '0.3s'
export function getStyle<
  T extends Animated.AnimatedStyleProp<ViewStyle | ImageStyle | TextStyle>
>(style: T, enable = true): T {
  'worklet'
  if (isWeb && enable) {
    let transition = ''
    for (const key in style) {
      transition = `${transition} ${transition ? ', ' : ''}${kebabCase(
        key
      )} ${duration} ${easing}`
    }
    ;(style as any).transition = transition
  }
  return style
}

export { withTimingNative }

export {
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
  diffClamp,
  scrollTo,
  FadeIn
}

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
