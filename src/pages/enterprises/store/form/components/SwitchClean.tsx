import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
interface Props {
  value: boolean
  onChange: (val: boolean) => void
}

const SwitchClean = (props: Props) => {
  return (
    <TouchableOpacity onPress={() => props.onChange(!props.value)}>
      <View
        style={[
          styles.switchBackground,
          props.value
            ? { alignItems: 'flex-end', backgroundColor: '#EBC744' }
            : { alignItems: 'flex-start', backgroundColor: '#D1D4DD' }
        ]}
      >
        <View style={[styles.dotSwitch]} />
      </View>
    </TouchableOpacity>
  )
}

export default SwitchClean

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
