import {
  Context,
  Extrapolate,
  interpolate,
  ScrollHandlers,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS
} from 'components/reanimated'
import { useEffect, useRef, RefObject } from 'react'
import { Animated, ScrollView } from 'react-native'
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'

type UseCollapseScrollType = { height?: number; ref?: RefObject<ScrollView> }
const useCollapseScroll = (params?: UseCollapseScrollType) => {
  const { height = 80 } = params || {}
  const scrollY = useRef(new Animated.Value(0)).current
  const offsetAnim = useRef(new Animated.Value(0)).current

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp'
      }),
      offsetAnim
    ),
    0,
    height
  )
  let _clampedScrollValue = 0
  let _offsetValue = 0
  let _scrollValue = 0

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      const diff = value - _scrollValue
      _scrollValue = value
      _clampedScrollValue = Math.min(Math.max(_clampedScrollValue + diff, 0), height)
    })
    offsetAnim.addListener(({ value }) => {
      _offsetValue = value
    })
  }, [])

  let scrollEndTimer: any = null

  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer)
  }

  const onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > height && _clampedScrollValue > height / 2
        ? _offsetValue + height
        : _offsetValue - height

    Animated.timing(offsetAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250)
  }

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, height],
    outputRange: [0, -height],
    extrapolate: 'clamp'
  })

  const opacity = clampedScroll.interpolate({
    inputRange: [0, height - 20, height],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp'
  })

  return {
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    onScrollEndDrag,
    opacity,
    scrollY,
    headerTranslate
  }
}

const clamp = (value: number, lowerBound: number, upperBound: number) => {
  'worklet'
  return Math.min(Math.max(lowerBound, value), upperBound)
}
type ScrollHandlerType = {
  <TContext extends Context = {}>(): ScrollHandlers<TContext>
}
export const useCollapseScrollV2 = (params: UseCollapseScrollType) => {
  const { height = 80, ref: refScroll } = params || {}
  const scrollClamp = useSharedValue(0)
  const offsetY = useSharedValue(0)
  const offsetScrollbar = useSharedValue(150)
  const layoutHeight = useSharedValue(0)
  const sizeHeight = useSharedValue(0)

  const scrollHandler = useRef<ScrollHandlerType>(() => {
    'worklet'
    return {
      onScroll: (event, context) => {
        'worklet'
        const y = event.contentOffset.y
        sizeHeight.value = event.contentSize.height
        layoutHeight.value = event.layoutMeasurement.height
        offsetScrollbar.value = interpolate(
          y,
          [0, sizeHeight.value - layoutHeight.value],
          [150, layoutHeight.value - 50]
        )
        const ctx = context as any
        if (y < 0) {
          return
        }
        offsetY.value = y
        const diff = y - (ctx.prevY || 0)
        scrollClamp.value = clamp(scrollClamp.value + diff, 0, height)
        ctx.prevY = y
      }
    }
  }).current

  const shadowStyle = useAnimatedStyle(() => {
    if (offsetY.value > 0) {
      return {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.27,
        shadowRadius: 2.65,
        elevation: 5
      }
    } else {
      return {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0
      }
    }
  })

  const RStyle = useAnimatedStyle(() => {
    const interpolateY = interpolate(
      scrollClamp.value,
      [0, height],
      [0, -height],
      Extrapolate.CLAMP
    )
    return {
      transform: [{ translateY: interpolateY }]
    }
  })

  const scrollbarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: offsetScrollbar.value
        }
      ]
    }
  })

  const scrollTo = (value: number) => {
    refScroll?.current?.scrollTo({ y: value, animated: false })
  }

  const gestureScrollbar = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, any>({
    onStart: (_, ctx) => {
      ctx.offsetScrollbar = offsetScrollbar.value
      ctx.sizeHeight = sizeHeight.value
      ctx.layoutHeight = layoutHeight.value
    },
    onActive: ({ translationY }, ctx) => {
      const progress = ctx.offsetScrollbar + translationY
      const value = interpolate(
        progress,
        [150, ctx.layoutHeight - 50],
        [0, ctx.sizeHeight - ctx.layoutHeight]
      )
      runOnJS(scrollTo)(value)
    }
  })
  const onLayout = (layout) => {}

  return {
    scrollHandler,
    scrollClamp,
    RStyle,
    offsetY,
    shadowStyle,
    offsetScrollbar,
    gestureScrollbar,
    scrollbarStyle,
    onLayout
  }
}

export default useCollapseScroll
