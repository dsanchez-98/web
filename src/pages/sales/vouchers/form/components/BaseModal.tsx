/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue
  // withTiming as withTiming
} from 'components/reanimated'
import React, {
  forwardRef,
  ForwardRefRenderFunction as FFC,
  FC,
  useImperativeHandle,
  useRef,
  useState,
  useCallback
} from 'react'
import { StyleSheet as NStyleSheet, Dimensions, Platform, TextInput } from 'react-native'
import useStateWithCallback from 'hooks/core/useStateCallback'
import Theme from 'components/theme'
import useBackHandler from 'hooks/useBackHandler'
import useKeyPress from 'hooks/web/useKeyPress'
import useBeforeUnload from 'hooks/web/useBeforeUnload'
import usePopState from 'hooks/web/usePopState'
import { getResponsiveLayout } from 'components/responsiveLayout/common'
import * as reanimated from 'react-native-reanimated'
import { useResponsiveStyles } from 'components/responsiveLayout'
import { statusBarHeight } from 'constants/core'
const { withTiming } = reanimated
type Layout = {
  height: number
  width: number
  y: number
  x: number
}

export interface BaseModalRef {
  show: (Component: any, layout: Layout) => void
  hide: () => void
  progress: Animated.SharedValue<number>
}

export interface BaseModalProps {
  children?: (params: {
    text: string
    reset: (callback?: () => void) => void
    clearText: () => void
  }) => JSX.Element
}

export interface WrapperContentProps {
  progress: Animated.SharedValue<number>
  layout: { [K in keyof Layout]: Animated.SharedValue<number> }
  headerHeight: Animated.SharedValue<number>
}

type StateCallback = {
  component: ((text: string) => JSX.Element) | null
}

type InputType = {
  text: string
  innerRef: any
}

const dimensions = Dimensions.get('window')
const DURATION = 250

const WrapperContent: FC<WrapperContentProps> = ({
  children,
  progress,
  layout,
  headerHeight
}) => {
  const { isMobile } = useResponsiveStyles({})
  const styleContainerInput = useAnimatedStyle(() => {
    return {
      marginHorizontal: isMobile ? 0 : 15,
      height: layout.height.value,
      transform: [
        {
          translateY: interpolate(
            progress.value,
            [0, 1],
            [layout.y.value - statusBarHeight, headerHeight.value]
          )
        },
        {
          translateX: progress.value ? 0 : 9999
        }
      ]
    }
  })

  return (
    <Animated.View style={[nStyles.containerInput, styleContainerInput]}>
      <Theme.View scheme={isMobile ? 'background' : 'primary'} style={{ flex: 1 }}>
        {children}
      </Theme.View>
    </Animated.View>
  )
}

const isWeb = Platform.OS === 'web'

const BaseModal: FFC<BaseModalRef, BaseModalProps> = (props, ref) => {
  const progress = useSharedValue(0)
  const [text, setText] = useState('')
  const refCallback = useRef<() => void>()
  const refInput = useRef<TextInput>()
  const refContentInput = useRef<any>()
  // layout
  const layoutY = useSharedValue(0)
  const layoutX = useSharedValue(0)
  const layoutWidth = useSharedValue(0)
  const layoutHeight = useSharedValue(0)
  const headerHeight = useSharedValue(0)

  const remove = (back: boolean) => {
    if (back && isWeb) {
      window.history.back()
    }
    setTimeout(() => {
      refCallback.current?.()
      refCallback.current = undefined
      blur()
    }, 200)
  }

  const { pushState } = usePopState(() => {
    hide(false)
  })

  const show = useCallback((Component: any, layout: Layout) => {
    if (!progress.value) {
      pushState()
      const start = () => {
        layoutY.value = layout.y
        layoutX.value = layout.x
        layoutHeight.value = layout.height
        layoutWidth.value = layout.width
        headerHeight.value = getResponsiveLayout(Dimensions.get('window')).isMobile
          ? 0
          : layout.y < 0
          ? 0
          : layout.y
        progress.value = withTiming(1, { duration: DURATION }, () => {
          runOnJS(focus)()
        })
      }
      if (!refContentInput.current?.state.component) {
        refContentInput.current?.setComponent(
          {
            component: (text: string) => (
              <WrapperContent
                headerHeight={headerHeight}
                progress={progress}
                layout={{
                  y: layoutY,
                  x: layoutX,
                  height: layoutHeight,
                  width: layoutWidth
                }}
              >
                <Component
                  clone
                  innerRef={refInput}
                  value={text}
                  hideModal={hide}
                  onChangeText={setText}
                  onBlur={() => {
                    // const { isMobile } = getResponsiveLayout(Dimensions.get('window'))
                    // if (progress.value && isMobile) {
                    //   focus()
                    // }
                  }}
                />
              </WrapperContent>
            )
          },
          start
        )
      } else {
        start()
      }
    }
  }, [])

  const showForm = () => {
    pushState()
    headerHeight.value = withTiming(-layoutHeight.value)
  }

  const hide = (back = true) => {
    progress.value = withTiming(0, { duration: DURATION }, (isFinished) => {
      isFinished && runOnJS(remove)(back)
    })
  }

  const reset = (callback?: () => void) => {
    refCallback.current = callback
    hide()
  }

  const focus = () => {
    refInput.current?.focus()
  }

  const blur = () => {
    refInput.current?.blur()
  }

  const clearText = () => {
    setText('')
  }

  const styleContent = useAnimatedStyle(() => {
    return {
      marginTop: layoutHeight.value + headerHeight.value,
      opacity: progress.value,
      transform: [
        {
          translateY: interpolate(progress.value, [0, 1], [dimensions.height * 2, 0])
        }
      ]
    }
  }, [])

  useBackHandler(() => {
    if (progress.value) {
      hide()
      return true
    }
    return false
  })

  useKeyPress(27, () => {
    if (progress.value === 1) {
      hide()
    }
  })

  useBeforeUnload((e) => {
    if (progress.value) {
      e.preventDefault()
    }
  })

  useImperativeHandle(ref, () => ({
    show,
    hide,
    progress
  }))

  return (
    <>
      <Theme.View
        style={nStyles.container}
        scheme="background"
        animatedStyles={styleContent}
      >
        {props.children?.({ text, reset, clearText, showForm })}
      </Theme.View>
      <Input innerRef={refContentInput} text={text} />
    </>
  )
}

const Input: FC<InputType> = ({ text, innerRef }) => {
  const [state, setComponent] = useStateWithCallback<StateCallback>({ component: null })
  innerRef && (innerRef.current = { setComponent, state })
  return <>{state.component && state.component(text)}</>
}

const nStyles = NStyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    elevation: 4
  },
  containerInput: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    elevation: 4,
    backgroundColor: 'transparent'
  }
})

export default forwardRef(BaseModal)
