import React, { FunctionComponent as FC } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View
} from 'react-native'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import Typography from 'components/typography'
import Icon from 'components/icon'
import { ButtonProps } from './types'

const stylesButton: { [key: string]: { button: ViewStyle; title: TextStyle } } = {
  primary: {
    button: {
      alignItems: 'center',
      backgroundColor: colors.primary,
      borderRadius: 6,
      height: 40,
      justifyContent: 'center',
      shadowColor: '#818df3',
      shadowOffset: { height: 4, width: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      width: '100%'
    },
    title: {
      color: colors.white
    }
  },
  secondary: {
    button: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderColor: colors.white,
      borderRadius: 6,
      borderWidth: 1,
      height: 40,
      justifyContent: 'center',
      width: '100%'
    },
    title: {
      color: colors.white
    }
  },
  secondaryBlue: {
    button: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderColor: colors.primary,
      borderRadius: 6,
      borderWidth: 1,
      height: 40,
      justifyContent: 'center',
      width: '100%'
    },
    title: {
      color: colors.primary
    }
  },
  icon: {
    button: {
      alignItems: 'center',
      borderRadius: 50,
      borderWidth: 0,
      justifyContent: 'center'
    },
    title: {}
  }
}

const Button: FC<ButtonProps> = (props) => {
  const style = stylesButton[props.type]
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[
        styles.button,
        style.button,
        props.disabled && styles.disabled,
        props.style
      ]}
      onPress={props.onPress}
    >
      {props.loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <View>
          {props.icon ? (
            <Icon
              name={props.icon.icon}
              height={props.icon.height}
              width={props.icon.width}
            />
          ) : (
            <Typography
              content={props.title}
              color={style.title.color}
              size={fontSize.md}
              style={styles.text}
              disableThemeColor
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.3
  },
  button: {
    flexDirection: 'row'
  }
})
