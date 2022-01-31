import Theme from 'components/theme'
import Typography from 'components/typography'
import React, { FunctionComponent as FC, useRef } from 'react'
import {
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import colors from 'styles/colors'

interface Props {
  value: string
  style?: StyleProp<ViewStyle | TextStyle>
  onChange: (value: string) => void
  percentage: boolean
  onChangePercentage: () => void
}

const InputDiscount: FC<Props> = (props) => {
  const { percentage, value, onChange, onChangePercentage } = props
  const refInput = useRef<any>(null)

  const component = (
    <TouchableOpacity style={{ flex: 1, width: 70 }} onPress={onChangePercentage}>
      <View style={percentage ? styles.percentage : styles.price}>
        <Typography
          content={percentage ? '%' : 'S/'}
          disableThemeColor
          color={colors.white}
        />
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={[props.style, { flexDirection: 'row' }]}>
      {!percentage && component}
      <View style={{ width: 70 }}>
        <Theme.TextInput
          innerRef={refInput}
          placeholder="0.00"
          value={`${value || ''}`}
          onChangeText={onChange}
          keyboardType="number-pad"
          selectTextOnFocus
          style={percentage ? styles.inputPorcentage : styles.inputPrice}
        />
      </View>
      {percentage && component}
    </View>
  )
}

const styles = StyleSheet.create({
  price: {
    height: 25,
    marginLeft: 2,
    marginVertical: 2,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center'
  },
  percentage: {
    height: 25,
    marginRight: 2,
    marginVertical: 2,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputPrice: {
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 2,
    marginRight: 2,
    textAlign: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderColor: colors.borderGray,
    height: 25,
    ...Platform.select({
      web: {
        outlineStyle: 'none'
      }
    })
  },
  inputPorcentage: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 2,
    marginLeft: 2,
    textAlign: 'center',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderColor: colors.borderGray,
    height: 25,
    ...Platform.select({
      web: {
        outlineStyle: 'none'
      }
    })
  }
})
export default InputDiscount
