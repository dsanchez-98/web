import { StyleProp, ViewStyle } from 'react-native'

export interface DropdownProps {
  value: string | string[]
  disabled?: boolean
  items: {
    label: string
    value: any
  }[]
  defaultItem?: string
  defaultOptions?: boolean
  multiple?: boolean
  type?: 'default' | 'small'
  color?: string
  fontFamily?: string
  style?: StyleProp<ViewStyle>
  styleContent?: StyleProp<ViewStyle>
  styleContentContainer?: StyleProp<ViewStyle>
  onChangeDefaultItem: (value: any) => void
  onChange: (value: any) => void
}
