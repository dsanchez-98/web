import React, {
  ForwardRefRenderFunction as FC,
  forwardRef,
  useImperativeHandle,
  useEffect
} from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView
} from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  runOnJS,
  getStyle
} from 'components/reanimated'
import ContentAlert from './ContentAlert'
import { ModalRef, ModalProps, State, OptionsModal, Params, PropsContent } from './types'
import BaseModal from './BaseModal'
import useMutableState from 'hooks/core/useMutableState'
import Typography from 'components/typography'
import fonts from 'styles/fonts'
import Icon from 'components/icon'
import Button from './components/Button'

const duration = 300

const Header = ({ title, message, icon, hideModal }: any) => {
  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', paddingVertical: 10, flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Typography content={title} size={17} fontFamily={fonts.baloo2SemiBold600} />
            <View style={stylesHeader.icon}>{icon}</View>
          </View>
        </View>
        <TouchableOpacity style={stylesHeader.btnClose} onPress={() => hideModal?.()}>
          <Icon name="close" color="#2A2D45" />
        </TouchableOpacity>
      </View>
      <Typography content={message} fontFamily={fonts.baloo2Regular400} />
    </>
  )
}

const stylesHeader = StyleSheet.create({
  icon: { alignSelf: 'center', marginHorizontal: 10 },
  btnClose: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Footer = ({ hideModal, onCancel, onAccept, cancelText, acceptText }: any) => {
  return (
    <View style={stylesFooter.container}>
      <Button
        type="cancel"
        title={cancelText || 'Cancelar'}
        onPress={() => hideModal?.(onCancel)}
      />
      <Button
        type="accept"
        title={acceptText || 'Aceptar'}
        onPress={() => hideModal?.(onAccept)}
      />
    </View>
  )
}

const stylesFooter = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    marginTop: 20
  }
})

const CustomModal: FC<ModalRef, ModalProps> = (props, ref) => {
  const modals = useMutableState<Map<any, State>>(new Map())
  modals.hookListener()

  const showModal = (...args: any[]) => {
    let state: State = {
      Content: ContentAlert
    }
    if (typeof args[0] === 'function') {
      const [Content, options, params] = args as [
        React.ReactElement,
        OptionsModal,
        Params?
      ]
      state = {
        Content,
        params,
        ...options
      }
    } else {
      const [options, params] = args as [OptionsModal, Params?]
      state = {
        Content: ContentAlert,
        params,
        ...options
      }
    }
    modals.value.set(Math.random(), state)
    modals.emit()
  }

  useImperativeHandle(ref, () => ({
    showModal
  }))

  return (
    <>
      {Array.from(modals.value.keys()).map((key) => {
        const modal = modals.value.get(key)!
        const deleteModal = () => {
          modals.value.delete(key)
          modals.emit()
        }
        return (
          <ContentModal key={key.toString()} modal={modal} deleteModal={deleteModal} />
        )
      })}
    </>
  )
}
interface ContentProps {
  modal: State
  deleteModal: () => void
}

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const ContentModal = ({ modal, deleteModal }: ContentProps) => {
  const { cancelable = true, type = 'default' } = modal
  const animatedModal = useSharedValue(0)
  const dimensions = useWindowDimensions()

  useEffect(() => {
    setTimeout(() => {
      open()
    }, 1)
  }, [])

  const open = () => {
    animatedModal.value = withTiming(1, { duration })
  }

  const hide = () => {
    animatedModal.value = withTiming(0, { duration }, () => {
      runOnJS(deleteModal)()
    })
  }

  const bgStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedModal.value, [0, 1], [0.1, 0.3])
    const backgroundColor = `rgba(0,0,0,${opacity})`
    return getStyle({
      backgroundColor
    })
  })

  const contentStyle = useAnimatedStyle(() => {
    const styles = {
      default: {
        alignItems: 'center',
        justifyContent: 'center',
        transform: [
          {
            translateY: interpolate(animatedModal.value, [0, 1], [dimensions.height, 0])
          }
        ]
      },
      panel: {
        flex: 1,
        transform: [
          {
            translateX: interpolate(
              animatedModal.value,
              [0, 1],
              [dimensions.width, dimensions.width - 350]
            )
          }
        ]
      }
    }
    const style = styles[type]
    return getStyle(style as any)
  })

  const onRequestClose = () => {
    if (cancelable) {
      hide()
      modal.onRequestClose && modal.onRequestClose()
    }
  }

  const propsContent = {
    ...modal,
    hideModal: (callback: any) => {
      hide()
      callback && callback()
    }
  }
  return (
    <BaseModal transparent visible onRequestClose={onRequestClose}>
      <ScrollView
        contentContainerStyle={type === 'default' ? styles.scroll : { flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <ATouchableOpacity
          activeOpacity={1}
          onPress={onRequestClose}
          style={[{ ...StyleSheet.absoluteFillObject }, bgStyle]}
        />
        <Animated.View style={contentStyle}>
          {modal.Content && (
            <modal.Content
              {...propsContent}
              header={<Header {...propsContent} />}
              footer={<Footer {...propsContent} />}
            />
          )}
        </Animated.View>
      </ScrollView>
    </BaseModal>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default forwardRef(CustomModal)
