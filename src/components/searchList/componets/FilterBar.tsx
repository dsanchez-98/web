import Icon, { IconProps } from 'components/icon'
import {
  StyleSheet as RStyleSheet,
  useResponsiveStyles
} from 'components/responsiveLayout'
import Theme from 'components/theme'
import React, { FunctionComponent as FC } from 'react'
import {
  View,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet
} from 'react-native'
import colors from 'styles/colors'

interface Props extends TextInputProps {
  onFilter?: () => void
}

const Button = (props: {
  style: StyleProp<ViewStyle>
  onPress: () => void
  propsIcon: IconProps
}) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
      <Icon {...props.propsIcon} />
    </TouchableOpacity>
  )
}

const FilterBar: FC<Props> = (props) => {
  const { ...rest } = props
  const { styles } = useResponsiveStyles(rStyles)
  return (
    <>
      <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
        <Theme.TextInput style={[styles.search, styles.none]} {...rest} />
      </View>
      <Button
        propsIcon={{ name: 'search' }}
        style={nStyles.buttonSearch}
        onPress={() => {}}
      />
      <Button
        propsIcon={{ name: 'filter' }}
        style={nStyles.buttonFilter}
        onPress={props.onFilter ? props.onFilter : () => {}}
      />
    </>
  )
}
const rStyles = RStyleSheet.create({
  search: {
    borderWidth: 0.5,
    borderColor: colors.borderGray,
    borderRadius: 5,
    display: 'none md:flex',
    height: 35,
    paddingLeft: 10,
    flex: 1,
    marginHorizontal: 5,
    width: 320
  },
  none: {
    display: 'none lg:flex'
  }
})

const border = 8
const nStyles = StyleSheet.create({
  buttonConfig: {
    borderColor: colors.primaryYellowLight,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    borderRadius: border,
    borderWidth: 1
  },
  buttonSearch: {
    backgroundColor: colors.primaryYellowLight,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    borderRadius: border
  },
  buttonFilter: {
    borderColor: colors.primaryYellowLight,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    borderRadius: border,
    borderWidth: 1
  },
  buttonViews: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2
  },
  buttonForm: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: border,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    height: 35,
    width: 150
  },
  container: {
    flexDirection: 'row',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    paddingTop: 5,
    paddingHorizontal: 15
  },
  containerLeft: {
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',
    borderRightWidth: 1,
    paddingRight: 5,
    borderColor: colors.grayBorder
  },
  containerRight: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderColor: colors.grayBorder,
    paddingLeft: 5
  }
})
export default FilterBar
