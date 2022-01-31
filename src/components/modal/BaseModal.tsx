import React, { FC, useEffect, useRef } from 'react'
import { View, ModalProps, Platform } from 'react-native'

interface Props extends ModalProps {}

const BaseModal: FC<Props> = (props) => {
  const ref = useRef<View>(null)
  useEffect(() => {
    ref.current?.focus()
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        props.onRequestClose?.()
      }
    }
    document.addEventListener('keyup', closeOnEscape, false)
    return () => document.removeEventListener('keyup', closeOnEscape, false)
  }, [])
  return (
    <View
      ref={ref}
      style={[
        {
          backgroundColor: 'transparent',
          position: (Platform.OS === 'web' ? 'fixed' : 'absolute') as any,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        props.style
      ]}
      focusable
    >
      {props.children}
    </View>
  )
}

export default BaseModal
