/* eslint-disable indent */
import React, { useCallback, FC, ReactNode } from 'react'
import Switch from 'components/switch'
import TextInput from 'components/textInput'
import ButtonSubmit from './ButtonSubmit'
import withField from './withField'
import Checkbox from 'components/checkbox'
import InputCode from 'components/inputCode'
import InputDropdown from 'components/textInput/components/InputDropdown'
import InputDocument from 'components/textInput/components/InputDocument'
import DatePicker from 'components/textInput/components/InputDatePicker'

const components = {
  switch: withField(Switch),
  textInput: withField(TextInput),
  buttonSubmit: withField(ButtonSubmit),
  checkbox: withField(Checkbox),
  inputCode: withField(InputCode),
  dropdown: withField(InputDropdown),
  document: withField(InputDocument),
  datePicker: withField(DatePicker)
}

type Props<T extends keyof typeof components, C> = {
  control?: T
  name?: string | { _PATH_: string }
  dependencies?: any[]
  component?: FC<C>
  children?: FC<
    C & {
      value: any
      onChange: (value: any) => void
      name: string
    }
  >
} & Parameters<typeof components[T]>[0] &
  (any extends C ? {} : C)

export type FormikControlType = {
  <K extends keyof typeof components, C>(props: Props<K, C>): JSX.Element | null
}

const FormikControl: FormikControlType = (props) => {
  const { control, component, children, ...rest } = props
  const Component = useCallback(
    children
      ? withField(children as any)
      : component
      ? withField(component!)
      : (components[control!] as any),
    []
  )

  if (!Component) return null
  return <Component {...rest} />
}

export default FormikControl
