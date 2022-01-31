import {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle
} from 'components/reanimated'
import { useEffect } from 'react'
import { PanGestureHandlerProps } from 'react-native-gesture-handler'
import * as reanimated from 'react-native-reanimated'
const { withTiming } = reanimated

export function useSwipeableItem(props: PanGestureHandlerProps) {
  const translateX = useSharedValue(0)
  const widthLeft = useSharedValue(0)
  const widthRight = useSharedValue(0)
  const readyLeft = useSharedValue(0)
  const readyRight = useSharedValue(0)

  const styleTranslateX = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      marginLeft: -widthLeft.value,
      paddingLeft: widthLeft.value,
      marginRight: -widthRight.value,
      paddingRight: widthRight.value,
      flex: 1
    }
  })

  const styleLeft = useAnimatedStyle(() => {
    return {
      opacity: readyLeft.value && widthLeft.value > 0 ? 1 : 0
    }
  })

  const styleRight = useAnimatedStyle(() => {
    return {
      opacity: readyRight.value && widthRight.value ? 1 : 0
    }
  })

  const close = () => {
    translateX.value = withTiming(0)
  }

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (p, ctx) => {
      ctx.x = translateX.value
    },
    onActive: ({ translationX }, ctx) => {
      const curr = ctx.x + translationX
      if (curr > 0 && curr > widthLeft.value) {
        return
      }
      if (curr < 0 && curr < -widthRight.value) {
        return
      }
      translateX.value = curr
    },
    onEnd: () => {
      if (translateX.value < 0) {
        if (translateX.value < -(widthRight.value / 2)) {
          translateX.value = withTiming(-widthRight.value)
        } else {
          translateX.value = withTiming(0)
        }
      }
      if (translateX.value > 0) {
        if (translateX.value > widthLeft.value / 2) {
          translateX.value = withTiming(widthLeft.value)
        } else {
          translateX.value = withTiming(0)
        }
      }
    }
  })

  useEffect(() => {
    if (!props.enabled) {
      close()
    }
  }, [props.enabled])

  return {
    styleTranslateX,
    translateX,
    widthLeft,
    widthRight,
    gestureHandler,
    close,
    styleLeft,
    styleRight,
    readyLeft,
    readyRight
  }
}
