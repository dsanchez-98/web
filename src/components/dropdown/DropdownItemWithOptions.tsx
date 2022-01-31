import Icon from 'components/icon'
import Switch from 'components/switch'
import Typography from 'components/typography'
import useTranslation from 'hooks/useTranslation'
import React, { FunctionComponent as FC } from 'react'
import { StyleProp, View, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native'
import colors from 'styles/colors'
import fonts from 'styles/fonts'

type PropsDropdownItemWithOptions = {
  key: React.Key | null | undefined
  size: number | undefined
  default: boolean
  item: { value: any; label: any }
  selected: boolean
  styleContent?: StyleProp<ViewStyle>
  styleContentContainer?: StyleProp<ViewStyle>
  styleLastItem?: StyleProp<ViewStyle>
  onPressItem: (val: boolean) => void
  onChangeDefault: () => void
}

const DropdownItemWithOptions: FC<PropsDropdownItemWithOptions> = (props) => {
  const { t } = useTranslation()
  return (
    <View>
      <View style={props.styleContentContainer}>
        <View
          style={[
            styles.selectItem,
            props.styleContent,
            {
              width: '100%',
              minHeight: 40
            },
            props.styleLastItem
          ]}
        >
          <View style={{ flexDirection: 'row' }}>
            <Switch value={props.selected} onChange={(val) => props.onPressItem(val)} />
            <Typography
              fontFamily={fonts.baloo2Medium500}
              color={colors.black}
              size={props.size}
              style={{ marginLeft: 4 }}
              content={props.item.label}
              disableThemeColor
            />
          </View>
          {props.selected && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={props.onChangeDefault}>
                <Icon name={props.default ? 'star' : 'starOutlined'} color="#8C4EF6" />
              </TouchableOpacity>
              <Typography
                fontFamily={fonts.baloo2Medium500}
                color={colors.black}
                size={props.size}
                style={{ marginLeft: 4 }}
                content={t('compDropDef')}
                disableThemeColor
              />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  selectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    alignItems: 'center'
  }
})

export default DropdownItemWithOptions
