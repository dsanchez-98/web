import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent
} from 'react-native-gesture-handler'
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from 'components/reanimated'

interface ColorPickerProps extends LinearGradientProps {
  maxWidth: number
  onColorChanged?: (color: string | number) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  start,
  end,
  style,
  maxWidth,
  onColorChanged
}) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)
  const adjustedTranslateY = useDerivedValue(() => {
    return Math.min(Math.max(translateY.value, 0), maxWidth - CIRCLE_PICKER_SIZE)
  })

  const onEnd = useCallback(() => {
    'worklet'
    translateX.value = withSpring(0)
    scale.value = withSpring(1)
  }, [])

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { y: number }>({
    onStart: (_, context) => {
      context.y = adjustedTranslateY.value
    },
    onActive: (event, context) => {
      translateY.value = event.translationY + context.y
    },
    onEnd
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { scale: scale.value },
        { translateY: adjustedTranslateY.value }
      ]
    }
  })

  const rInternalPickerStyle = useAnimatedStyle(() => {
    const inputRange = colors.map((_, index) => (index / colors.length) * maxWidth)
    const backgroundColor = interpolateColor(translateY.value, inputRange, colors)
    onColorChanged?.(backgroundColor)

    return {
      backgroundColor
    }
  })

  return (
    // <TapGestureHandler onGestureEvent={tapGestureEvent}>
    <View>
      <LinearGradient colors={colors} start={start} end={end} style={style} />
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.picker, rStyle]}>
          <Animated.View style={[styles.internalPicker, rInternalPickerStyle]} />
        </Animated.View>
      </PanGestureHandler>
    </View>
    // </TapGestureHandler>
  )
}

const CIRCLE_PICKER_SIZE = 30
const INTERNAL_PICKER_SIZE = CIRCLE_PICKER_SIZE / 2

const styles = StyleSheet.create({
  picker: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  internalPicker: {
    width: INTERNAL_PICKER_SIZE,
    height: INTERNAL_PICKER_SIZE,
    borderRadius: INTERNAL_PICKER_SIZE / 2,
    borderWidth: 1.0,
    borderColor: 'rgba(0,0,0,0.2)'
  }
})

export default ColorPicker
