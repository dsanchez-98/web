import Animated, {
  useDerivedValue,
  runOnJS,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useSharedValue
} from 'components/reanimated'
import React, {
  forwardRef,
  ForwardRefRenderFunction as FC,
  useImperativeHandle,
  useState
} from 'react'

import { WaterfallItemProps } from '../../type'

const WaterfallItem: FC<{}, WaterfallItemProps> = (props, ref) => {
  const getIndex = (offset: number) => {
    'worklet'
    let index = 0
    for (let i = 0; i < props.input.length; ++i) {
      if (offset > props.input[i]) {
        index = i
      }
    }
    return props.itemIndexes[index]
  }
  const aIndex = useSharedValue(getIndex(props.animatedOffset.value))

  const updateOffset = (offset: number) => {
    const itemIndex = getIndex(offset)
    if (itemIndex !== aIndex.value) {
      aIndex.value = itemIndex
    }
  }

  useImperativeHandle(ref, () => ({
    updateOffset
  }))

  const animatedstyle = useAnimatedStyle(() => {
    return {
      height: props.heightForItem(props.data[aIndex.value], aIndex.value),
      width: props.wrapperWidth,
      transform: [
        {
          translateY: interpolate(
            props.animatedOffset.value,
            props.input,
            props.output,
            Extrapolate.CLAMP
          )
        },
        {
          translateX: props.wrapperWidth * props.index
        }
      ]
    }
  })

  return (
    <Animated.View style={[props.style, animatedstyle]}>
      <WrapperItem {...props} aIndex={aIndex} />
    </Animated.View>
  )
}

const WrapperItem = (
  props: WaterfallItemProps & { aIndex: Animated.SharedValue<number> }
) => {
  const [currenIndex, setCurrentIndex] = useState(props.aIndex.value)

  useDerivedValue(() => {
    if (currenIndex !== props.aIndex.value) {
      runOnJS(setCurrentIndex)(props.aIndex.value)
    }
  }, [currenIndex])

  return <>{props.renderItem?.({ item: props.data[currenIndex], index: currenIndex })}</>
}

export default forwardRef(WaterfallItem)
