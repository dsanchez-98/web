import React, { FunctionComponent as FC } from 'react'
import LottieWeb from 'lottie-react-web'
import { LottieProps } from './types'

const Lottie: FC<LottieProps> = (props) => {
  return (
    <LottieWeb
      height={props.height}
      width={props.width}
      speed={props.speed}
      options={{
        animationData: props.source,
        autoplay: props.autoPlay,
        loop: props.loop
      }}
    />
  )
}

export default Lottie
