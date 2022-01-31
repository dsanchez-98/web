/* eslint-disable no-unused-vars */
import React, {
  FunctionComponent as FC,
  useState,
  useRef,
  useEffect,
  ReactNode
} from 'react'
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  useWindowDimensions,
  ScaledSize
} from 'react-native'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  getStyle
} from 'components/reanimated'
import useMeasure from 'hooks/core/useMeasure'
import * as animated from 'react-native-reanimated'

const { Extrapolate, useDerivedValue } = animated
interface Props {
  content: ReactNode
  widthPopover?: number
  heightPopover?: number
}

type Layout = {
  height: number
  width: number
  y: number
  x: number
}

const valueLayout = { height: 0, width: 0, y: 0, x: 0 }
const HEIGHT_TR = 20
const CONTENT_WIDTH = 380
const PopoverView: FC<Props> = (props) => {
  const refView = useRef<View>(null)
  const [visible, setVisible] = useState(false)
  const layoutHeight = useSharedValue(valueLayout.height)
  const layoutWidth = useSharedValue(valueLayout.width)
  const layoutY = useSharedValue(valueLayout.y)
  const layoutX = useSharedValue(valueLayout.x)

  const dimension = useWindowDimensions()
  const { getMeasure } = useMeasure(refView)

  const setValue = (l: Layout) => {
    layoutHeight.value = l.height
    layoutWidth.value = l.width
    layoutX.value = l.x
    layoutY.value = l.y
  }

  const show = async () => {
    const l = await getMeasure()
    if (l) {
      setValue(l)
      setVisible(true)
    }
  }

  const hide = () => {
    setVisible(false)
  }

  useEffect(() => {
    const start = async () => {
      const l = await getMeasure()
      l && setValue(l)
    }
    start()
  }, [dimension])

  return (
    <>
      <View ref={refView} onLayout={() => {}}>
        <TouchableOpacity onPress={show}>{props.children}</TouchableOpacity>
      </View>
      {visible && (
        <Content
          layout={{
            height: layoutHeight,
            width: layoutWidth,
            x: layoutX,
            y: layoutY
          }}
          hide={hide}
          content={props.content}
          getMeasure={getMeasure}
          dimension={dimension}
          heightPopover={props.heightPopover}
          widthPopover={props.widthPopover}
        />
      )}
    </>
  )
}
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

type ContentType = {
  layout: { [P in keyof Layout]: Animated.SharedValue<number> }
  hide: () => void
  content: ReactNode
  getMeasure: () => Promise<Layout | undefined>
  dimension: ScaledSize
  heightPopover?: number
  widthPopover?: number
}

const useContent = (props: ContentType) => {
  const progress = useSharedValue(0)
  const isTop = useDerivedValue(() => {
    const y = props.layout.y.value
    const heightPopover = props.heightPopover
    return heightPopover ? heightPopover < y : false
  })

  useEffect(() => {
    progress.value = withTiming(1)
  }, [])

  const close = () => {
    progress.value = withTiming(0, { duration: 100 }, () => {
      runOnJS(props.hide)()
    })
  }

  const bgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 1], [0.0, 0.2])
    const backgroundColor = `rgba(0,0,0,${opacity})`
    return getStyle({
      backgroundColor
    })
  })

  const triangleStyle = useAnimatedStyle(() => {
    const y = props.layout.y.value
    const x = props.layout.x.value
    const height = props.layout.height.value
    const width = props.layout.width.value
    const topStart = y + height
    const top = interpolate(progress.value, [0, 1], [topStart - 10, topStart])
    return getStyle({
      position: 'absolute',
      top: isTop.value ? y - HEIGHT_TR : top,
      left: width / 2 + (x - 8),
      opacity: progress.value
    })
  })

  const contentStyle = useAnimatedStyle(() => {
    const widthPopover = props.widthPopover || CONTENT_WIDTH
    const heightPopover = props.heightPopover
    const topStart = HEIGHT_TR
    const x = props.layout.x.value
    const width = props.layout.width.value
    const center = width / 2 + (x - 16)
    const left = -interpolate(
      center,
      [0, widthPopover],
      [8, widthPopover - 30],
      Extrapolate.CLAMP
    )

    return getStyle({
      position: 'absolute',
      top: isTop.value ? -heightPopover! : topStart,
      opacity: progress.value,
      width: widthPopover,
      left,
      height: heightPopover
    })
  })

  return {
    close,
    bgStyle,
    triangleStyle,
    contentStyle,
    isTop
  }
}

const Content: FC<ContentType> = (props) => {
  const { close, bgStyle, triangleStyle, contentStyle, isTop } = useContent(props)

  const content = (
    <Animated.View style={[styles.content, contentStyle]}>{props.content}</Animated.View>
  )

  const rotation = useAnimatedStyle(() => {
    return { transform: [{ rotate: isTop.value ? '180deg' : '0deg' }] }
  })

  const triangle = (
    <Animated.View style={[triangleStyle]}>
      <Animated.View style={[styles.triangle, rotation]} />
      {content}
    </Animated.View>
  )

  return (
    <Modal visible transparent statusBarTranslucent onRequestClose={close}>
      <AnimatedTouchableOpacity
        onPress={close}
        style={[{ flex: 1 }, bgStyle]}
        activeOpacity={1}
      >
        {triangle}
      </AnimatedTouchableOpacity>
    </Modal>
  )
}

const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2
}

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 8,
    borderBottomWidth: HEIGHT_TR,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent'
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    ...shadow
  }
})

export default PopoverView
