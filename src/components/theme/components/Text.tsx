import React, { FC } from 'react'
import { TextProps, Text as TextNative } from 'react-native'
import useTheme from 'hooks/useTheme'
import { getStyle } from 'components/reanimated'
interface Props extends TextProps {}
const Text: FC<Props> = (props) => {
  const { scheme, schemes } = useTheme()

  const style = getStyle({
    color: schemes[scheme].text
  })
  return <TextNative {...props} style={[{ fontSize: 15 }, props.style, style]} />
}

export default Text
