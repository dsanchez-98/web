import React, { FC, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import colors from 'styles/colors'
import TextInputBase, { useFocusInput } from './TextInputBase'
import { TextInputProps } from '../types'
import Dropdown from 'components/dropdown/Dropdown2'
import Icon from 'components/icon'
import Typography from 'components/typography'
import fonts from 'styles/fonts'
import fontSize from 'styles/fontSize'
import Animated, { interpolate, useAnimatedStyle, getStyle } from 'components/reanimated'
import Theme from 'components/theme'

const Arrow = ({ progress }: { progress: Animated.SharedValue<number> }) => {
  const style = useAnimatedStyle(() => {
    return getStyle({
      transform: [{ rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg` }]
    })
  })

  return (
    <Animated.View style={[{ width: 24, height: 24 }, style]}>
      <Theme.Icon name="arrow" />
    </Animated.View>
  )
}

interface IInputDropdown extends Omit<TextInputProps, 'value' | 'onChange'> {
  onChange?: (value: any) => void
  value?: any
  items?: Array<{ value: any; label: string }>
  multiple?: boolean
  setFieldValue?: (name: string, value: any) => void
  onItemSelect?: (item: any, setFieldValue?: IInputDropdown['setFieldValue']) => void
  showSearch?: boolean
  onPress?: (value: any) => void
  renderItem?: (params: {
    item: any
    isHover: boolean
    selected: boolean
    onPress: () => void
  }) => JSX.Element
  closeOnSelect?: boolean
}

const Content = (props: any) => {
  const { value, onRemove, rightContent, placeholder, error, isSuccess, disabled } = props
  const {
    onFocus,
    onBlur,
    styleBorderColor,
    stylePlaceholder,
    stylePlaceholderContainer
  } = useFocusInput({
    text: value.length,
    widthLeftComponent: 0,
    error,
    isSuccess,
    disabled
  })

  useEffect(() => {
    if (value.length) {
      onFocus()
    } else {
      onBlur()
    }
  }, [value])

  return (
    <View>
      <View style={styles.containerInput}>
        <Animated.View style={[styles.containerChips, styleBorderColor]}>
          {value?.map((item: any, index: number) => {
            return (
              <View key={index.toString()} style={styles.chip}>
                <Typography
                  fontFamily={fonts.baloo2Medium500}
                  color={colors.white}
                  size={fontSize.md}
                  style={{ textAlign: 'center', alignSelf: 'center' }}
                  content={item?.label}
                  disableThemeColor
                />
                <TouchableOpacity
                  onPress={() => onRemove(item)}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <View
                    style={{
                      margin: 4,
                      borderRadius: 20,
                      backgroundColor: '#FFFFFF',
                      padding: 4
                    }}
                  >
                    <Icon name="equis" width={8} height={8} color={colors.primary} />
                  </View>
                </TouchableOpacity>
              </View>
            )
          })}
        </Animated.View>
        <View style={{ justifyContent: 'center' }}>{rightContent()}</View>
        <Animated.View style={[styles.placeholder, stylePlaceholderContainer]}>
          <Animated.Text
            style={[{ fontFamily: fonts.baloo2Regular400 }, stylePlaceholder]}
            numberOfLines={1}
          >
            {placeholder}
          </Animated.Text>
        </Animated.View>
      </View>
      {!!error && (
        <Typography
          style={styles.textError}
          numberOfLines={1}
          content={error}
          color={colors.red}
          size={fontSize.xxs}
          disableThemeColor
        />
      )}
    </View>
  )
}

const InputDropdown: FC<IInputDropdown> = (props) => {
  const {
    value,
    items = [],
    multiple = false,
    showSearch,
    onItemSelect,
    setFieldValue,
    style,
    onPress,
    renderItem,
    closeOnSelect,
    ...rest
  } = props
  console.log('propsLL', props)

  return (
    <Dropdown
      style={style}
      multiple={multiple}
      items={items}
      value={value}
      showSearch={showSearch}
      disableButton={rest.disabled}
      renderItem={renderItem}
      closeOnSelect={closeOnSelect}
      onChange={(val) => {
        onItemSelect?.(val, setFieldValue)
        if (multiple) {
          props.onChange?.([...(value || []), val.value])
        } else {
          props.onChange?.(val.value)
        }
      }}
      onPress={() => {
        onPress?.(value)
      }}
    >
      {({ progress, value: valueSelect }) => {
        const arrow = () => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5
              }}
            >
              <Arrow progress={progress} />
            </View>
          )
        }
        if (Array.isArray(valueSelect) && multiple) {
          return (
            <Content
              {...rest}
              value={valueSelect}
              rightContent={arrow}
              onRemove={(item: any) => {
                props.onChange?.(value.filter((i: string) => i !== item.value))
              }}
            />
          )
        }
        return (
          <TextInputBase
            {...rest}
            value={(valueSelect as any)?.label || ''}
            editable={false}
            pointerEvents="none"
            rightContent={arrow}
          />
        )
      }}
    </Dropdown>
  )
}

const styles = StyleSheet.create({
  containerInput: {
    minHeight: 42,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    flexDirection: 'row',
    padding: 5
  },
  containerChips: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1
  },
  chip: {
    flexDirection: 'row',
    paddingLeft: 8,
    margin: 2,
    backgroundColor: colors.primary,
    borderRadius: 200,
    marginRight: 4
  },
  placeholder: { ...StyleSheet.absoluteFillObject, right: undefined },
  textError: {
    paddingTop: 2
    // height: 14
  }
})
export default InputDropdown
