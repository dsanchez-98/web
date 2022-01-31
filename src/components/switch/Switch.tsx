import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
interface Props {
  value: boolean
  disabled?: boolean
  onChange: (val: boolean) => void
}

const Switch: FC<Props> = (props) => {
  return (
    <TouchableOpacity disabled={props.disabled} onPress={() => props.onChange(!props.value)}>
      <View
        style={[
          styles.switchBackground,
          props.value
            ? { alignItems: 'flex-end', backgroundColor: '#EBC744' }
            : { alignItems: 'flex-start', backgroundColor: '#D1D4DD' },
          props.disabled ? { backgroundColor: '#E0E0E0' } : {}
        ]}
      >
        <View style={[styles.dotSwitch, props.disabled ? { backgroundColor: '#F1F1F1' } : {}]} />
      </View>
    </TouchableOpacity>
  )
}

export default Switch

const styles = StyleSheet.create({
  dotSwitch: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10
  },
  switchBackground: {
    width: 44,
    height: 24,
    padding: 2,
    justifyContent: 'center',
    borderRadius: 20
  }
})
