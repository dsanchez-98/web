import Icon from 'components/icon'
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle
} from 'components/reanimated'
import React, { FunctionComponent as FC } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import colors from 'styles/colors'

interface Props {
  progress: Animated.SharedValue<number>
  style?: StyleProp<ViewStyle>
}
const size = 14

const Arrow: FC<Props> = ({ progress, style }) => {
  const aStyle = useAnimatedStyle(() => {
    const rotate = `${interpolate(progress.value, [0, 1], [0, 180])}deg`
    const backgroundColor = interpolateColor(progress.value, [0, 1], ['#BFDDFF', 'white'])
    const borderColor = interpolateColor(progress.value, [0, 1], ['#BFDDFF', 'black'])
    return {
      transform: [{ rotate }],
      backgroundColor,
      borderWidth: 1,
      borderColor
    }
  })

  return (
    <Animated.View style={[styles.arrowContainer, aStyle, style || {}]}>
      <View style={{ width: size, height: size }}>
        <Icon name="arrowDown" color={colors.black} width={size} height={size} />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  arrowContainer: {
    width: 18,
    height: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Arrow
