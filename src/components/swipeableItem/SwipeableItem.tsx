import Animated, { withTiming, withDelay } from 'components/reanimated'
import React, { FunctionComponent as FC } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { PanGestureHandler, PanGestureHandlerProps } from 'react-native-gesture-handler'
import { useSwipeableItem } from './hooks'

interface Props extends PanGestureHandlerProps {
  leftContent?: JSX.Element
  rightContent?: JSX.Element
  style?: StyleProp<ViewStyle>
}

const SwipeableItem: FC<Props> = (props) => {
  const { leftContent, rightContent, style, ...rest } = props
  const {
    widthLeft,
    widthRight,
    gestureHandler,
    styleTranslateX,
    readyLeft,
    readyRight,
    styleLeft,
    styleRight
  } = useSwipeableItem(rest)

  return (
    <PanGestureHandler
      failOffsetY={[-20, 20]}
      activeOffsetX={[-20, 20]}
      {...props}
      onGestureEvent={gestureHandler}
    >
      <Animated.View style={[styleTranslateX, style || {}]}>
        {props.children}
        {leftContent && (
          <Animated.View
            onLayout={({ nativeEvent: { layout } }) => {
              widthLeft.value = layout.width
              readyLeft.value = withDelay(10, withTiming(1, { duration: 10 }))
            }}
            style={[styles.leftContent, styleLeft]}
          >
            {leftContent}
          </Animated.View>
        )}
        {rightContent && (
          <Animated.View
            onLayout={({ nativeEvent: { layout } }) => {
              widthRight.value = layout.width
              readyRight.value = withDelay(10, withTiming(1, { duration: 10 }))
            }}
            style={[styles.rightContent, styleRight]}
          >
            {rightContent}
          </Animated.View>
        )}
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  leftContent: {
    height: '100%',
    position: 'absolute',
    left: 0,
    overflow: 'hidden'
  },
  rightContent: {
    height: '100%',
    position: 'absolute',
    right: 0,
    overflow: 'hidden'
  }
})
export default SwipeableItem
