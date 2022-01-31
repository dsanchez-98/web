import React, { FC } from 'react'
import { ImageProps, Image as ImageNative } from 'react-native'
import useTheme from 'hooks/useTheme'
import { getStyle } from 'components/reanimated'

const Image: FC<ImageProps> = (props) => {
  const { schemes, scheme } = useTheme()

  const style = getStyle({
    tintColor: schemes[scheme].text
  })
  return <ImageNative {...props} style={[props.style, style]} />
}

export default Image
