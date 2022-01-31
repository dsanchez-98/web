import React, { FunctionComponent as FC } from 'react'
import LottieView from 'lottie-react-native'
import { LottieProps } from './types'

const Lottie: FC<LottieProps> = (props) => {
  return (
    <LottieView
      style={{ height: props.height, width: props.width }}
      autoPlay={props.autoPlay}
      source={props.source}
      loop={props.loop}
      speed={props.speed}
    />
  )
}

export default Lottie
