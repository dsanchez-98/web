import React from 'react'
import { View, TextInput, Platform, StyleSheet, TextStyle } from 'react-native'

interface Props {
  placeholder?: string
  onChange: (val: string) => void
  disabled?: boolean
  value: string
  style?: TextStyle
}

const TextInputClean = (props: Props) => {
  return (
    <>
      <View style={props.disabled ? { backgroundColor: '#F1F1F1', borderRadius: 6 } : {}}>
        <TextInput
          editable={!props.disabled}
          placeholderTextColor={props.disabled ? '#B2B2B2' : '#C1C1C1'}
          placeholder={props.placeholder || ''}
          onChangeText={props.onChange}
          value={props.value}
          style={[styles.textInputClean, props.style]}
        ></TextInput>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  textInputClean: {
    width: '100%',
    height: 40,
    paddingLeft: 8,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 6,
    flexWrap: 'wrap',
    ...Platform.select({
      web: {
        outlineStyle: 'none'
      }
    })
  }
})

export default TextInputClean
