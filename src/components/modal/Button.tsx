import React, { FunctionComponent as FC } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

interface Props {
  title: string
  borderColor: string
  backgroundColor: string
  textColor: string
  onPress: () => void
  disabled?: boolean
}

const Button: FC<Props> = (props) => {
  const { title, borderColor, backgroundColor, textColor, onPress, disabled = false } = props
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        flex: 1,
        borderColor,
        borderRadius: 10,
        backgroundColor,
        marginHorizontal: 10
        // padding: 5,
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10
        }}
      >
        <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 12 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Button
