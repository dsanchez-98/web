import React, { FC, useEffect, useState } from 'react'
import { ImageProps } from 'react-native'
import useTheme from 'hooks/useTheme'
import Animated from 'components/reanimated'

const Text: FC<ImageProps> = (props) => {
  const { addThemeLister, scheme, theme } = useTheme()

  const [tintColor, setTintColor] = useState(theme.value ? scheme.text[1] : scheme.text[0])

  useEffect(() => {
    const unsubscribe = addThemeLister((t) => {
      setTintColor(t === 'dark' ? scheme.text[1] : scheme.text[0])
    })
    return unsubscribe
  }, [])
  return <Animated.Image {...props} style={[props.style || {}, { tintColor }]} />
}

export default Text
