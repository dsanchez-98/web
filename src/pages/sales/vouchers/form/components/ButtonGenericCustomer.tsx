import Icon from 'components/icon'
import React, { FunctionComponent as FC } from 'react'
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native'
import colors from 'styles/colors'

interface Props extends TouchableOpacityProps {
  select: boolean
  onPress: () => void
}

const ButtonGenericCustomer: FC<Props> = (props) => {
  const { style, select, onPress, ...rest } = props
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: select ? colors.primary : undefined },
        style
      ]}
      {...rest}
      onPress={onPress}
    >
      <Icon name="incognito" color={select ? 'white' : colors.primary} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 35,
    width: 35,
    borderWidth: 0.5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderColor: colors.primary
  }
})
export default ButtonGenericCustomer
