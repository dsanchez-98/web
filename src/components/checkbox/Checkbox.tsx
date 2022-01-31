import React, { FunctionComponent as FC } from 'react'
import Icon from 'components/icon'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import colors from 'styles/colors'
import { CheckboxProps } from './types'

const stylesCheckbox: { [key: string]: ViewStyle } = {
  primary: {
    borderColor: colors.primary
  },
  secondary: {
    borderColor: colors.purple
  }
}

const backgroundActive = {
  primary: colors.primary,
  secondary: colors.purple
}

const Button: FC<CheckboxProps> = (props) => {
  const style = stylesCheckbox[props.type]
  const bgActive = backgroundActive[props.type]

  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[
        styles.checkbox,
        style,
        props.disabled && styles.disabled,
        props.style,
        { backgroundColor: !props.value ? 'transparent' : bgActive }
      ]}
      onPress={() => props.onChange(!props.value)}
    >
      {props.value && <Icon name={'check'} color={'#FFFFFF'} height={16} width={16} />}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    height: 16,
    justifyContent: 'center',
    width: 16
  },
  disabled: {
    opacity: 0.3
  }
})
