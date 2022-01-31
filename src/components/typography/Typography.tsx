import Theme from 'components/theme'
import React, { FunctionComponent as FC } from 'react'
import { Text } from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import { TypographyProps } from './types'

const Typography: FC<TypographyProps> = (props) => {
  const {
    size = fontSize.sm,
    color = colors.black,
    fontFamily = fonts.baloo2Regular400
  } = props
  if (props.disableThemeColor) {
    return (
      <Text
        {...props}
        style={[props.style, { color, fontSize: size, fontFamily }]}
        onPress={props.onPress}
      >
        {props.content}
      </Text>
    )
  }
  return (
    <Theme.Text
      {...props}
      style={[props.style || {}, { color, fontSize: size, fontFamily }]}
      onPress={props.onPress}
    >
      {props.content}
    </Theme.Text>
  )
}

export default Typography
