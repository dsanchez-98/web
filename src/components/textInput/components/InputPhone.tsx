import React, { FunctionComponent as FC } from 'react'
import TextInputBase from './TextInputBase'
import { TextInputProps } from '../types'

const InputPhone: FC<TextInputProps> = (props) => {
  return (
    <TextInputBase {...props} leftContent="peru" keyboardType="phone-pad" widthLeftComponent={40} />
  )
}

export default InputPhone
