import React, { FC, useEffect, useRef } from 'react'
import { ModalProps } from 'react-native'
import ReactDOM from 'react-dom'

interface Props extends ModalProps {}

const Portal: FC<Props> = (props) => {
  const { children } = props
  const elementRef = React.useRef<any>(null)

  if (!elementRef.current) {
    const element = document.createElement('div')
    element.style.position = 'fixed'
    if (element && document.body) {
      document.body.appendChild(element)
      elementRef.current = element
    }
  }

  React.useEffect(() => {
    return () => {
      if (document.body && elementRef.current) {
        document.body.removeChild(elementRef.current)
        elementRef.current = null
      }
    }
  }, [])

  return elementRef.current ? ReactDOM.createPortal(children, elementRef.current) : null
}

const PortalModal: FC<Props> = (props) => {
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        props.onRequestClose?.()
      }
    }
    const closeModal = ({ target }: any) => {
      React.Children.forEach(props.children, (e: any) => {
        if (e?.ref?.current) {
          if (!e?.ref?.current.contains(target)) {
            props.onRequestClose?.()
          }
        }
      })
    }
    document.addEventListener('keyup', closeOnEscape, false)
    document.addEventListener('click', closeModal, { capture: true })

    return () => {
      document.removeEventListener('keyup', closeOnEscape, false)
      document.removeEventListener('click', closeModal, { capture: true })
    }
  }, [props.onRequestClose])

  return <Portal>{props.children}</Portal>
}

export default PortalModal
