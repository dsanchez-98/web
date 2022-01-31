import React, { FC, useContext } from 'react'
import Animated, { useAnimatedProps } from 'components/reanimated'
import { Path as P, PathProps } from 'react-native-svg'
import { Context } from './ContextSVG'

const AnimatedPath = Animated.createAnimatedComponent(P)

const Path: FC<PathProps> = (props) => {
  const { animatedColor } = useContext(Context)

  const animatedProps = useAnimatedProps(() => {
    return {
      fill: animatedColor.value,
      stroke: props.strokeWidth ? animatedColor.value : undefined
    }
  })

  return <AnimatedPath {...props} animatedProps={animatedProps} {...{ style: {} }} />
}

export default Path
