import React from 'react'
import { FCProps } from './types'
import { View, TextInput, Platform } from 'react-native'

const TextInputArea: FCProps = ({ ...props }) => {
  return (
    <>
      <View>
        <TextInput
          multiline={true}
          placeholder={props.placeholder || 'Ingrese un mensaje'}
          value={props.value}
          onChangeText={(val) => props.onChange(val)}
          style={{
            height: 120,
            paddingHorizontal: 8,
            paddingTop: 4,
            borderColor: '#CCCCCC',
            borderWidth: 1,
            borderRadius: 6,
            textAlignVertical: 'top',
            flexWrap: 'wrap',
            ...Platform.select({
              web: {
                outlineStyle: 'none'
              }
            })
          }}
        ></TextInput>
      </View>
    </>
  )
}

export default TextInputArea
