import React, { FC, useRef } from 'react'
import { TextInput, View, Platform } from 'react-native'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
interface InputCodeProps {
  textToValidate: string
  value: string
  onChange: (text: string) => void
}
const InputCode: FC<InputCodeProps> = ({
  value = '',
  onChange = () => {},
  textToValidate = ''
}) => {
  const { styles } = useResponsiveStyles(rStyles)
  const refInputs = useRef<any>({})

  const nextFocus = (index: number) => {
    const nextRef = refInputs.current[index + 1]
    if (nextRef) {
      nextRef.focus()
    }
  }

  const previusFocus = (index: number) => {
    const nextRef = refInputs.current[index - 1]
    if (nextRef) {
      nextRef.focus()
    }
  }
  return (
    <View style={styles.inputsContainer}>
      {textToValidate.split('').map<JSX.Element>((_, index) => {
        return (
          <TextInput
            key={index.toString()}
            ref={(ref) => {
              refInputs.current[index] = ref
            }}
            autoFocus={!index}
            // editable={!index || !!text[index]}
            value={value[index] || ''}
            style={styles.inputCodeCharacter}
            maxLength={1}
            onChangeText={(val) => {
              if (val) {
                onChange(`${value}${val}`)
                nextFocus(index)
              } else {
                onChange(`${value.slice(0, index)}`)
                previusFocus(index)
              }
            }}
          />
        )
      })}
    </View>
  )
}
const rStyles = StyleSheet.create({
  inputsContainer: {
    flexDirection: 'row'
  },
  inputCodeCharacter: {
    width: '32 md:40',
    height: '32 md:40',
    textAlign: 'center',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderColor: '#AEAEAE',
    borderWidth: 1,
    marginRight: '4 md:12',
    ...Platform.select({
      web: {
        outlineStyle: 'none'
      }
    })
  }
})

export default InputCode
