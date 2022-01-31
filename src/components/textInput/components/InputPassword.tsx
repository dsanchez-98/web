import React, { FunctionComponent as FC, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from 'styles/colors'
import TextInputBase from './TextInputBase'
import { TextInputProps } from '../types'
import Theme from 'components/theme'

const InputPassword: FC<TextInputProps> = (props) => {
  const [visible, setVisible] = useState(false)
  return (
    <TextInputBase
      {...props}
      leftContent="password"
      widthLeftComponent={40}
      rightContent={() => {
        return (
          !!props.value && (
            <View style={[styles.icon, { opacity: props.disabled ? 0.3 : 1 }]}>
              <Text
                style={visible ? { height: 14 } : { height: 16 }}
                onPress={() => setVisible(!visible)}
              >
                <Theme.Icon name={visible ? 'eye' : 'eyeInvisible'} />
              </Text>
            </View>
          )
        )
      }}
      secureTextEntry={!visible}
    />
  )
}
const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40
  },
  iconLeft: {
    borderRightColor: colors.gray,
    borderRightWidth: 1
  }
})

export default InputPassword
