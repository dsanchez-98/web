import Dropdown from 'components/dropdown/Dropdown2'
import Theme from 'components/theme'
import Typography from 'components/typography'
import React, { FunctionComponent as FC, useState } from 'react'
import { View, Text, StyleSheet, Platform, TextInputProps } from 'react-native'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
interface Props extends TextInputProps {
  label?: string
}

const Input: FC<Props> = (props) => {
  const { label, style, onPress, ...rest } = props
  const [text, setText] = useState('')
  const [select, setSelect] = useState('')
  const [items, setItems] = useState(
    new Array(200)
      .fill({})
      .map((_, index) => ({ label: `${index + 1}`, value: `${index + 1}` }))
  )
  const data = items.filter(
    (i) => i.label.toLowerCase().indexOf(text.toLowerCase()) !== -1
  )
  return (
    <View style={style}>
      <Typography
        content={label}
        style={{ lineHeight: 13 }}
        size={fontSize.xs}
        numberOfLines={1}
      />
      <Theme.View scheme={'primary'} style={{ borderRadius: 5 }}>
        <Theme.TextInput
          // autoFocus
          style={styles.textInput}
          {...rest}
          onChangeText={setText}
          value={text}
        />
      </Theme.View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 35,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: colors.borderGray,
    paddingHorizontal: 5,
    ...Platform.select({
      web: {
        outlineStyle: 'none'
      }
    })
  }
})

export default Input
