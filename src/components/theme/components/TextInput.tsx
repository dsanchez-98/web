import React, { FC } from 'react'
import { TextInput as TextInputNative, TextInputProps, Platform } from 'react-native'
import useTheme from 'hooks/useTheme'
import Animated, { getStyle } from 'components/reanimated'
import colors from 'styles/colors'

interface Props extends TextInputProps {
  innerRef?: any
  disableThemeColor?: boolean
  animatedProps?: any
}

const TextInputAnimated = Animated.createAnimatedComponent(TextInputNative)
const TextInput: FC<Props> = (props) => {
  const { scheme, schemes } = useTheme()
  const style = getStyle({ color: schemes[scheme].text })
  const placeholderColor = scheme === 'dark' ? 'white' : colors.grayBorder
  const textInputProps = {
    ref: props.innerRef,
    placeholderTextColor: placeholderColor,
    ...props,
    style: [inputStyle, props.style || {}, !props.disableThemeColor ? style : {}]
  }
  if (props.animatedProps) {
    return <TextInputAnimated {...textInputProps} />
  }
  return <TextInputNative {...textInputProps} />
}

const inputStyle = {
  ...Platform.select({
    web: {
      outlineStyle: 'none'
    }
  })
} as any

export default TextInput
