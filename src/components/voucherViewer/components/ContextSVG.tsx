import React, { FC } from 'react'
import Animated from 'components/reanimated'

export const Context = React.createContext<{ animatedColor: Animated.SharedValue<string> }>({
  animatedColor: { value: '' }
})

const ContextSVG: FC<{ animatedColor: Animated.SharedValue<string> }> = (props) => {
  return (
    <Context.Provider value={{ animatedColor: props.animatedColor }}>
      {props.children}
    </Context.Provider>
  )
}

export default ContextSVG
