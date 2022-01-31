import React, { FC, useEffect, useState } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  getStyle,
  runOnJS
} from 'components/reanimated'
import Theme from 'components/theme'

interface Props {
  active?: boolean
  height: number
  renderWrapper?: (props: {
    children: any
    progress: Animated.SharedValue<number>
  }) => JSX.Element
  unmount?: boolean
}

export const Arrow = ({
  progress,
  color
}: {
  progress: Animated.SharedValue<number>
  color?: string
}) => {
  const style = useAnimatedStyle(() => {
    return getStyle({
      transform: [{ rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg` }]
    })
  })
  return (
    <Animated.View style={[{ width: 24, height: 24 }, style]}>
      <Theme.Icon name="arrow" color={color} />
    </Animated.View>
  )
}

const Content: FC<{}> = (props) => {
  const opacity = useSharedValue(0)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 100 })
  }, [])

  const aStyle = useAnimatedStyle(() => {
    return getStyle({
      opacity: opacity.value
    })
  })
  return <Animated.View style={aStyle}>{props.children}</Animated.View>
}

const Acordeon: FC<Props> = (props) => {
  const { renderWrapper = ({ children }) => <>{children}</>, unmount = true } = props
  const progress = useSharedValue(props.active ? 1 : 0)
  const [visible, setVisible] = useState(unmount ? props.active : true)

  const _setVisible = (value: boolean) => {
    unmount && setVisible(value)
  }

  const open = () => {
    progress.value = withTiming(1, {}, () => {
      runOnJS(_setVisible)(true)
    })
  }

  const close = () => {
    progress.value = withTiming(0, {}, () => {
      runOnJS(_setVisible)(false)
    })
  }

  useEffect(() => {
    if (props.active) open()
    else close()
  }, [props.active])

  const aStyle = useAnimatedStyle(() => {
    return getStyle({
      height: interpolate(progress.value, [0, 1], [0, props.height]),
      overflow: 'hidden'
    })
  })

  return renderWrapper({
    progress,
    children: (
      <Animated.View style={aStyle}>
        {visible && <Content>{props.children}</Content>}
      </Animated.View>
    )
  })
}

export default Acordeon
