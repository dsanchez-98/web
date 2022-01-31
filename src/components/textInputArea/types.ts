import { FC as Component } from 'react'
import { TextInputProps as TextInputPropsNative } from 'react-native'
export interface TextInputAreaProps extends Omit<TextInputPropsNative, 'onChange'> {
  width?: string
  error?: string
  value?: string
  onChange: (text: string) => void
  onValidation?: (text: string) => boolean
  disabled?: boolean
}

export type FCProps = Component<TextInputAreaProps>
