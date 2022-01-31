import Typography from 'components/typography'
import React, { FunctionComponent as FC } from 'react'
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'

const stylesByType = {
  accept: {
    backgroundColor: colors.primary,
    textcolor: colors.white,
    borderColor: colors.primary
  },
  cancel: {
    backgroundColor: colors.white,
    textcolor: colors.primary,
    borderColor: colors.primary
  }
}

interface Props {
  title?: string
  onPress?: () => void
  type: keyof typeof stylesByType
  style?: StyleProp<ViewStyle>
}

const Button: FC<Props> = (props) => {
  const style = stylesByType[props.type]
  return (
    <TouchableOpacity
      style={[
        props.style,
        styles.btnModal,
        { backgroundColor: style.backgroundColor, borderColor: style.borderColor }
      ]}
      onPress={props.onPress}
    >
      <Typography
        content={props.title}
        color={style.textcolor}
        fontFamily={fonts.baloo2SemiBold600}
        disableThemeColor
      />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  btnModal: {
    width: 128,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  }
})

export default Button
