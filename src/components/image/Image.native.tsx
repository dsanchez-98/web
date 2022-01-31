import React, { FunctionComponent as FC } from 'react'
import FastImage from 'react-native-fast-image'

const Image: FC<any> = (props) => {
  return <FastImage {...props} resizeMode={props.style?.resizeMode} />
}

export default Image
