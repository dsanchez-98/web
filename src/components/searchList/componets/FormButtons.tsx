import Icon from 'components/icon'
import Typography from 'components/typography'
import React, { FunctionComponent as FC } from 'react'
import { View, TouchableOpacity, StyleSheet as NStyleSheet } from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'

interface Props {
  cancelText?: string
  confirmText?: string
  onPressCancel?: () => void
  onPressConfirm?: () => void
  hideCancel?: boolean
  hideSave?: boolean
  minimal?: boolean
}

interface ButtonProps {
  onPress?: () => void
  text?: string
  minimal?: boolean
}
const ButtonsForm: FC<Props> = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {!props.hideCancel && (
        <ButtonCancel
          onPress={props.onPressCancel}
          text={props.cancelText}
          minimal={props.minimal}
        />
      )}
      {!props.hideSave && (
        <ButtonSave
          onPress={props.onPressConfirm}
          text={props.confirmText}
          minimal={props.minimal}
        />
      )}
    </View>
  )
}
export const ButtonSave = ({ onPress, text, minimal }: ButtonProps) => {
  const style = {
    height: SIZE,
    width: minimal ? SIZE : 150,
    borderRadius: minimal ? SIZE / 2 : 5
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[nStyles.shadow, nStyles.buttonSave, style]}
    >
      {!minimal ? (
        <Typography
          content={text}
          disableThemeColor
          color={colors.white}
          fontFamily={fonts.baloo2SemiBold600}
        />
      ) : (
        <Icon name="check" color={colors.white} />
      )}
    </TouchableOpacity>
  )
}

export const ButtonCancel = ({ onPress, text, minimal }: ButtonProps) => {
  const style = {
    height: SIZE,
    width: minimal ? SIZE : 80,
    borderRadius: minimal ? SIZE / 2 : 5,
    borderColor: minimal ? colors.primary : colors.borderGray
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[nStyles.shadow, nStyles.buttonCancel, style]}
    >
      {!minimal ? (
        <Typography
          content={text}
          disableThemeColor
          color={colors.primary}
          fontFamily={fonts.baloo2SemiBold600}
        />
      ) : (
        <Icon name="equis" color={colors.primary} />
      )}
    </TouchableOpacity>
  )
}
const SIZE = 35

const nStyles = NStyleSheet.create({
  buttonSave: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: colors.primary
  },
  buttonCancel: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
})

export default ButtonsForm
