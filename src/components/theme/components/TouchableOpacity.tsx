import React, { FC } from 'react'
import {
  TouchableOpacity as TouchableOpacityNative,
  TouchableOpacityProps
} from 'react-native'
import useTheme from 'hooks/useTheme'
import Animated, { getStyle } from 'components/reanimated'
import { Scheme } from 'context/ThemeContext'

interface Props extends TouchableOpacityProps {
  scheme: keyof Scheme
  animatedStyles?: any
}

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacityNative)
const AnimatedTouchableOpacity: FC<Props> = (props) => {
  const { animatedStyles, ...rest } = props

  return <ATouchableOpacity {...rest} style={[rest.style, animatedStyles]} />
}
const TouchableOpacity: FC<Props> = (props) => {
  const { scheme, schemes } = useTheme()

  const style = getStyle({
    backgroundColor: schemes[scheme][props.scheme],
    borderColor: schemes[scheme].border
    // shadowColor: schemes[scheme].background,
  })
  if (props.animatedStyles) {
    return <AnimatedTouchableOpacity {...props} style={[props.style || {}, style]} />
  }
  return <TouchableOpacityNative {...props} style={[props.style || {}, style]} />
}

export default TouchableOpacity
