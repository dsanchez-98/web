/* eslint-disable indent */
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { State, TapGestureHandler } from 'react-native-gesture-handler'
import Animated, * as animated from 'react-native-reanimated'

const { Easing, useAnimatedStyle, useSharedValue, withTiming } = animated
export function hexToRgbA(hex: string, opacity: number) {
  let c: any
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = `0x${c.join('')}`
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`
  }
  throw new Error('Bad Hex')
}

type ValueOf<T> = T[keyof T]

interface RippleButtonProps {
  children: React.ReactElement
  color?: string
  borderRadius?: number
  onPress?: () => void
  rippleScale?: number
  duration?: number
  overflow?: boolean
  rippleColor?: string
  rippleOpacity?: number
}

function RippleButton({
  children,
  color,
  borderRadius,
  onPress = () => {},
  rippleScale = 1,
  duration = 250,
  overflow = false,
  rippleColor = '#000',
  rippleOpacity = 0.5
}: RippleButtonProps) {
  const [radius, setRadius] = React.useState(-1)
  const child = React.Children.only(children)
  const scale = useSharedValue(0)
  const positionX = useSharedValue(0)
  const positionY = useSharedValue(0)
  const state = useSharedValue<ValueOf<typeof State>>(State.UNDETERMINED)
  const isFinished = useSharedValue(false)
  const uas = useAnimatedStyle(
    () => ({
      top: positionY.value - radius,
      left: positionX.value - radius,
      transform: [
        {
          scale: scale.value
        }
      ]
    }),
    [radius]
  )

  return (
    <TapGestureHandler
      maxDurationMs={9999999999}
      onHandlerStateChange={(event) => {
        state.value = event.nativeEvent.state
        positionX.value = event.nativeEvent.x
        positionY.value = event.nativeEvent.y

        scale.value =
          event.nativeEvent.state !== State.FAILED
            ? withTiming(
                rippleScale,
                { duration, easing: Easing.bezier(0, 0, 0.8, 0.4) },
                (finised) => {
                  if (finised) {
                    isFinished.value = true
                    scale.value = withTiming(0, { duration: 0 })
                  }
                  if (state.value === State.BEGAN && finised) {
                    scale.value = withTiming(1, { duration: 0 })
                  }
                }
              )
            : 0

        if (event.nativeEvent.state === State.BEGAN) {
          isFinished.value = false
        }

        if (event.nativeEvent.state === State.END) {
          if (isFinished.value) {
            scale.value = withTiming(0, { duration: 0 })
          }
          onPress()
        }
      }}
    >
      <Animated.View {...child.props} style={child.props.style}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius,
            backgroundColor: color,
            overflow: !overflow ? 'hidden' : undefined
          }}
          onLayout={({
            nativeEvent: {
              layout: { width, height }
            }
          }) => {
            setRadius(Math.sqrt(width ** 2 + height ** 2))
          }}
        >
          {radius !== -1 && (
            <Animated.View
              style={[
                uas,
                {
                  position: 'absolute',
                  width: radius * 2,
                  height: radius * 2,
                  borderRadius: radius,
                  backgroundColor: hexToRgbA(rippleColor, rippleOpacity)
                }
              ]}
            />
          )}
        </View>
        {child.props.children}
      </Animated.View>
    </TapGestureHandler>
  )
}

export default RippleButton
