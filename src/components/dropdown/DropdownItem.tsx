import Typography from 'components/typography'
import React, { FunctionComponent as FC } from 'react'
import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import colors from 'styles/colors'
import fonts from 'styles/fonts'

type PropsDropdownItem = {
  key: React.Key | null | undefined
  size: number | undefined
  item: { value: any; label: any }
  selected: boolean
  styleContent?: StyleProp<ViewStyle>
  styleContentContainer?: StyleProp<ViewStyle>
  styleLastItem?: StyleProp<ViewStyle>
  onPressItem: () => void
}

const DropdownItem: FC<PropsDropdownItem> = (props) => {
  return (
    <View>
      <TouchableOpacity style={props.styleContentContainer} onPress={props.onPressItem}>
        <View
          style={[
            styles.selectItem,
            props.styleContent,
            {
              width: '100%',
              minHeight: 40,
              borderWidth: 1,
              borderColor: colors.grayBorder
            },
            props.styleLastItem,
            props.selected
              ? {
                  backgroundColor: colors.primary
                }
              : {}
          ]}
        >
          <Typography
            fontFamily={fonts.baloo2Medium500}
            color={props.selected ? colors.white : colors.black}
            size={props.size}
            style={{ width: '100%', textAlign: 'center' }}
            content={props.item.label}
            disableThemeColor
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  selectItem: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default DropdownItem
