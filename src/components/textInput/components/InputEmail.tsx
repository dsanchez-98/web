import React, { FunctionComponent as FC } from 'react'
import TextInputBase from './TextInputBase'
import { TextInputProps } from '../types'

const InputEmail: FC<TextInputProps> = (props) => {
  return (
    <TextInputBase
      {...props}
      leftContent="user"
      keyboardType="email-address"
      widthLeftComponent={40}
    />
  )
}

export default InputEmail
