import React, { FunctionComponent as FC } from 'react'
import { Image as ImageNative, ImageProps } from 'react-native'
interface Props extends ImageProps {}

const Image: FC<Props> = (props) => {
  return <ImageNative {...props} />
}

export default Image
