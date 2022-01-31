import { ReactNode } from 'react'
import { TextProps } from 'react-native'

export interface TypographyProps extends TextProps {
  color?: string
  content?: string | ReactNode
  size?: number
  fontFamily?: string
  disableThemeColor?: boolean
}
