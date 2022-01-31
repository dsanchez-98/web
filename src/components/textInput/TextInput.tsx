import React from 'react'
import InputDatePicker from './components/InputDatePicker'
import InputEmail from './components/InputEmail'
import InputPassword from './components/InputPassword'
import InputPhone from './components/InputPhone'
import TextInputBase from './components/TextInputBase'

const inputs = {
  default: TextInputBase,
  email: InputEmail,
  datePicker: InputDatePicker,
  password: InputPassword,
  phone: InputPhone
}

type Props<K extends keyof typeof inputs = 'default'> = {
  type?: K
} & Parameters<typeof inputs['default']>[0]

export type TextInputType = {
  <K extends keyof typeof inputs = 'default'>(props: Props<K>): JSX.Element | null
  type?: any
}

const TextInput: TextInputType = (props) => {
  const { type = 'default', ...rest } = props
  const Input = inputs[type] as any
  return <Input {...rest} />
}

export default TextInput
