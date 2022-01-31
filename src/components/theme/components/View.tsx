import React, { FC } from 'react'
import { ViewProps, View as ViewNative } from 'react-native'
import useTheme from 'hooks/useTheme'
import { getStyle } from 'components/reanimated'
import { Scheme } from 'context/ThemeContext'
import Animated from 'react-native-reanimated'

interface Props extends ViewProps {
  scheme: keyof Scheme
  animatedStyles?: any
}

const AnimatedView: FC<Props> = (props) => {
  const { animatedStyles, ...rest } = props

  return <Animated.View {...rest} style={[rest.style, animatedStyles]} />
}
const View: FC<Props> = (props) => {
  const { scheme, schemes } = useTheme()

  const style = getStyle({
    backgroundColor: schemes[scheme][props.scheme],
    borderColor: schemes[scheme].border
    // shadowColor: interpolateColor(theme.value, [0, 1], ['#000', '#fff'])
  })
  if (props.animatedStyles) {
    return <AnimatedView {...props} style={[props.style || {}, style]} />
  }

  return <ViewNative {...props} style={[props.style || {}, style]} />
}

export default View
