import React, { ReactNode } from 'react'

export interface ModalProps {}

export type Params = { [key: string]: any }

export type OptionsModal = {
  type?: 'default' | 'panel'
  onRequestClose?(): void
  cancelable?: boolean
  onAccept?: (value?: any) => void
  onCancel?: (value?: any) => void
  acceptText?: string
  cancelText?: string
  message?: string
  title?: string
  icon?: ReactNode
}

export type ModalRef = {
  showModal(Content: any, options: OptionsModal, params?: Params): void
  showModal(options: OptionsModal, params?: Params): void
}

export type State<P extends Params = {}> = {
  Content: any
  params?: P
} & OptionsModal

export type PropsContent<P = { [key: string]: any }> = State<P> & {
  hideModal(callback?: () => void): void
  header: React.ReactNode
  footer: React.ReactNode
}
