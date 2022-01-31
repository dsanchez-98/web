import { IconNames } from 'components/icon/Icon'
import { FC as Component, ReactNode } from 'react'
import { ColorValue, TextInputProps as TextInputPropsNative } from 'react-native'
export interface TextInputProps extends Omit<TextInputPropsNative, 'onChange'> {
  innerRef?: React.Ref<TextInputPropsNative>
  leftContent?: (() => ReactNode) | IconNames
  rightContent?: (() => ReactNode) | IconNames
  width?: string
  error?: string
  isSuccess?: boolean
  onChange?: (text: string) => void
  onValidation?: (text: string) => boolean
  disabled?: boolean
  widthLeftComponent?: number
  inputHeight?: number
  borderColor?: ColorValue
  textColor?: ColorValue
  placeholderStatic?: string
}

export type FCProps = Component<TextInputProps>
