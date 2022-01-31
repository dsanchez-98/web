import { StyleProp, ViewStyle } from 'react-native'

export type ButtonProps = {
  disabled?: boolean
  icon?: any
  type: 'primary' | 'secondary' | 'secondaryBlue' | 'icon'
  title?: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  loading?: boolean
}
