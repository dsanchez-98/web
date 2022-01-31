/* eslint-disable indent */
import React, { useEffect } from 'react'
import { View, StyleSheet, Platform, ColorValue } from 'react-native'
import Animated, {
  getStyle,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedProps
} from 'components/reanimated'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import { FCProps } from '../types'
import Theme from 'components/theme'
import useTheme from 'hooks/useTheme'
import Icon from 'components/icon'
import { IconNames } from 'components/icon/Icon'
import Typography from 'components/typography'
import fontSize from 'styles/fontSize'

const phHeight = 18
const defaultColor = '#CCCCCC'
const pHColor = '#C1C1C1'
const txtColor = '#2A2D45'

type UseFocusInput = {
  text?: string
  widthLeftComponent?: number
  isSuccess?: boolean
  error: any
  disabled?: boolean
  inputHeight?: number
  placeholderTextColor?: ColorValue
  placeholderStatic?: string
}
export const useFocusInput = ({
  text,
  widthLeftComponent = 0,
  isSuccess,
  disabled,
  error,
  inputHeight = 40,
  placeholderTextColor,
  placeholderStatic
}: UseFocusInput) => {
  const progress = useSharedValue(text ? 1 : 0)
  const focus = useSharedValue(0)
  const { scheme } = useTheme()

  const onFocus = () => {
    progress.value = withTiming(1)
    focus.value = 1
  }

  const onBlur = () => {
    if (!text) {
      progress.value = withTiming(0)
    }
    focus.value = 0
  }

  const stylePlaceholderContainer = useAnimatedStyle(() => {
    // const backgroundColor = interpolateColor(theme.value, [0, 1], scheme.primary)
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [10, -(widthLeftComponent - 5)]
    )
    const translateY = interpolate(
      progress.value,
      [0, 1],
      [(inputHeight - phHeight) / 2, -(phHeight - 4)]
    )
    return getStyle({
      height: phHeight,
      // backgroundColor,
      transform: [
        {
          translateX
        },
        {
          translateY
        }
      ]
    })
  }, [widthLeftComponent])

  const stylePlaceholder = useAnimatedStyle(() => {
    const fontSize = interpolate(progress.value, [0, 1], [14, 10])
    const colorLigth = interpolateColor(progress.value, [0, 1], [pHColor, txtColor])
    const colorDark = interpolateColor(progress.value, [0, 1], [pHColor, 'white'])

    return getStyle({
      fontFamily: progress.value ? fonts.baloo2SemiBold600 : fonts.baloo2Regular400,
      fontSize,
      color: placeholderTextColor || (scheme === 'dark' ? colorDark : colorLigth)
    })
  }, [pHColor, txtColor, placeholderTextColor, scheme])

  const color = isSuccess && !error ? colors.green : error ? colors.red : defaultColor

  const styleBorderColor = useAnimatedStyle(() => {
    return {
      borderColor: disabled
        ? colors.borderGray
        : focus.value && !isSuccess && !error && !disabled
        ? colors.primary
        : color
    }
  }, [disabled, isSuccess, error, color])

  const animatedProps = useAnimatedProps(() => {
    return {
      placeholderTextColor: focus.value === 1 ? 'gray' : 'transparent'
    }
  }, [placeholderStatic])

  useEffect(() => {
    if (text) {
      progress.value = withTiming(1)
    } else {
      onBlur()
    }
  }, [text])

  return {
    onBlur,
    onFocus,
    stylePlaceholderContainer,
    stylePlaceholder,
    focus,
    styleBorderColor,
    animatedProps
  }
}

const TextInputBase: FCProps = ({
  disabled,
  style,
  placeholder,
  onChange,
  onValidation,
  isSuccess,
  widthLeftComponent,
  innerRef,
  inputHeight = 40,
  borderColor,
  placeholderTextColor,
  textColor,
  placeholderStatic,
  ...props
}) => {
  const {
    animatedProps,
    styleBorderColor,
    onFocus,
    onBlur,
    stylePlaceholder,
    stylePlaceholderContainer
  } = useFocusInput({
    text: props.value,
    widthLeftComponent,
    isSuccess,
    error: props.error,
    disabled,
    inputHeight,
    placeholderTextColor,
    placeholderStatic
  })

  const icon = isSuccess ? (
    <Icon name="check" />
  ) : props.error ? (
    <Icon name="error" />
  ) : undefined

  const getLeftContent = () => {
    if (typeof props.leftContent === 'function') {
      return props.leftContent()
    } else if (typeof props.leftContent === 'string') {
      return renderIcon(props.leftContent, inputHeight)
    }
    return null
  }

  const getRightContent = () => {
    if (typeof props.rightContent === 'function') {
      return props.rightContent()
    } else if (typeof props.rightContent === 'string') {
      return renderIcon(props.rightContent, inputHeight)
    }
    return null
  }

  const _phHeight = placeholder ? phHeight : 0

  return (
    <View style={style}>
      <View style={{ height: inputHeight + _phHeight, width: '100%' }}>
        <View style={[{ paddingTop: _phHeight - 2 }]}>
          <Animated.View
            style={[
              styles.container,
              borderColor ? { borderColor } : styleBorderColor,
              disabled ? { backgroundColor: colors.disabled } : {}
            ]}
            pointerEvents={disabled ? 'none' : undefined}
          >
            <View style={{ opacity: disabled ? 0.3 : 1, width: widthLeftComponent }}>
              {getLeftContent()}
            </View>
            <View style={{ height: inputHeight, flex: 1 }}>
              <Theme.TextInput
                innerRef={innerRef}
                animatedProps={animatedProps}
                {...props}
                value={props.value || ''}
                placeholder={placeholderStatic}
                onChangeText={onChange}
                style={[
                  styles.input,
                  { height: inputHeight, opacity: disabled ? 0.3 : 1, color: textColor }
                ]}
                disableThemeColor={!!textColor}
                onFocus={(e) => {
                  onFocus()
                  props.onFocus?.(e)
                }}
                onBlur={(e) => {
                  onBlur()
                  props.onBlur?.(e)
                }}
                underlineColorAndroid="transparent"
                onKeyPress={props.onKeyPress}
              />
              <Animated.View style={[styles.placeholder, stylePlaceholderContainer]}>
                <Animated.Text
                  style={[{ fontFamily: fonts.baloo2Regular400 }, stylePlaceholder]}
                  numberOfLines={1}
                >
                  {placeholder}
                </Animated.Text>
              </Animated.View>
            </View>
            {getRightContent()}
            {icon && (
              <View style={[styles.containerIcon, { opacity: disabled ? 0.3 : 1 }]}>
                {icon}
              </View>
            )}
          </Animated.View>
        </View>
      </View>
      {!!props.error && (
        <Typography
          style={styles.textError}
          numberOfLines={1}
          content={props.error}
          color={colors.red}
          size={fontSize.xxs}
          disableThemeColor
        />
      )}
    </View>
  )
}

const renderIcon = (name: IconNames, inputHeight: number) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <View
        style={{
          borderRightWidth: 1,
          borderColor: defaultColor,
          width: inputHeight,
          height: inputHeight - 6,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon name={name} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row'
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    right: undefined
  },
  input: {
    zIndex: 1,
    flex: 1,
    // paddingHorizontal: 10,
    paddingHorizontal: 10,
    ...Platform.select({
      web: {
        outlineStyle: 'none'
      }
    }),
    width: '100%',
    fontFamily: fonts.baloo2Regular400
  },
  textError: {
    paddingTop: 2
    // height: 14
  },
  containerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10
  },
  icon: {
    height: 18,
    width: 18,
    resizeMode: 'contain'
  }
})

export default TextInputBase
