import { StyleProp, ViewStyle } from 'react-native'

export type CheckboxProps = {
  disabled?: boolean
  type: 'primary' | 'secondary'
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  value: boolean
  onChange: (val: boolean) => void
}
