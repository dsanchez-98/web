import React, { FunctionComponent as FC, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { DropdownProps } from './types'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import Typography from 'components/typography'
import fonts from 'styles/fonts'
import Icon from 'components/icon'
import DropdownItem from './DropdownItem'
import DropdownItemWithOptions from './DropdownItemWithOptions'

const Dropdown: FC<DropdownProps> = (props: any) => {
  const [open, setOpen] = useState(false)
  const {
    color = colors.black,
    disabled,
    fontFamily = fonts.baloo2Medium500,
    items,
    style = { borderRadius: 10, alignItems: 'center' },
    type = 'default'
  } = props

  const borderRadius = style.borderRadius || 10
  const textAlign = style.alignItems || 'center'

  return (
    <View style={{ width: '100%' }}>
      {props.multiple && props.value.length > 0 ? (
        <View style={styles.multipleSelect}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}
          >
            {Array.isArray(props.value) &&
              props.value.map((x: any, k: React.Key | null | undefined) => (
                <View
                  key={k}
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 8,
                    marginBottom: 8,
                    backgroundColor: '#4DA0FF',
                    borderRadius: 200,
                    marginRight: 4
                  }}
                >
                  <Typography
                    fontFamily={fonts.baloo2Medium500}
                    color={colors.white}
                    size={fontSize.md}
                    style={{ textAlign: 'center' }}
                    content={items.find((z: any) => z.value === x)?.label}
                    disableThemeColor
                  />
                  <TouchableOpacity
                    onPress={() => {
                      if (Array.isArray(props.value)) {
                        let nuevaLista = props.value
                        nuevaLista = props.value.filter((y: any) => y !== x)
                        props.onChange(nuevaLista)
                      }
                    }}
                  >
                    <Icon name="equis" />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
          <TouchableOpacity onPress={() => setOpen((prev) => !prev)}>
            <Icon name="arrowDown" color={colors.black} />
          </TouchableOpacity>
        </View>
      ) : (
        <View pointerEvents={disabled ? 'none' : undefined}>
          <TouchableOpacity onPress={() => setOpen((prev) => !prev)}>
            <View
              style={[
                styles.mainSelect,
                {
                  backgroundColor: disabled ? colors.disabled : colors.white
                },
                {
                  width: '100%',
                  minHeight: 40,
                  borderWidth: 1,
                  borderColor: '#CCCCCC'
                },
                open
                  ? {
                      borderTopRightRadius: borderRadius || 10,
                      borderTopLeftRadius: borderRadius || 10
                    }
                  : {
                      borderRadius: borderRadius || 10
                    }
              ]}
            >
              <Typography
                fontFamily={fontFamily}
                color={color}
                size={type === 'small' ? fontSize.xs : fontSize.sm}
                style={{ flex: 1, marginLeft: 8, textAlign: textAlign || 'center' }}
                content={
                  items.find((x: { value: any }) => x.value === props.value)?.label ||
                  'Seleccionar'
                }
                disableThemeColor
              />
              <View style={{ marginRight: 8 }}>
                <Icon
                  name="arrowDown"
                  color={disabled ? colors.iconDisabled : colors.black}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
      {open && (
        <View>
          {props.defaultOptions
            ? items.map(
                (x: { value: any; label: any }, k: React.Key | null | undefined) => (
                  <DropdownItemWithOptions
                    default={props.defaultItem === x.value}
                    onChangeDefault={() => props.onChangeDefaultItem(x.value)}
                    onPressItem={(val) => {
                      if (val) {
                        const nuevaLista = props.value
                        nuevaLista.push(x.value)
                        props.onChange([...new Set(nuevaLista)])
                      } else {
                        let nuevaLista = props.value
                        nuevaLista = props.value.filter((y: any) => y !== x.value)
                        props.onChange(nuevaLista)
                      }
                      // setOpen(false)
                    }}
                    styleLastItem={
                      k === items.length - 1
                        ? { borderBottomEndRadius: 10, borderBottomStartRadius: 10 }
                        : {}
                    }
                    selected={props.value.some((y: string) => y === x.value)}
                    size={type === 'small' ? fontSize.xs : fontSize.sm}
                    item={x}
                    key={k}
                  />
                )
              )
            : items.map(
                (x: { value: any; label: any }, k: React.Key | null | undefined) => (
                  <DropdownItem
                    onPressItem={() => {
                      if (Array.isArray(props.value)) {
                        const nuevaLista = props.value
                        nuevaLista.push(x.value)
                        props.onChange([...new Set(nuevaLista)])
                      } else {
                        props.onChange(x.value)
                      }
                      setOpen(false)
                    }}
                    selected={props.value.some((y: string) => y === x.value)}
                    styleLastItem={
                      k === items.length - 1
                        ? { borderBottomEndRadius: 10, borderBottomStartRadius: 10 }
                        : {}
                    }
                    size={type === 'small' ? fontSize.xs : fontSize.sm}
                    item={x}
                    key={k}
                  />
                )
              )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainSelect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  multipleSelect: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    paddingHorizontal: 8,
    paddingTop: 8,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between'
  }
})

export default Dropdown
