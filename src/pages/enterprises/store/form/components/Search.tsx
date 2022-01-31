import Icon from 'components/icon'
import React from 'react'
import { View, TextInput, Platform, StyleSheet, TextStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
  placeholder?: string
  onChange: (val: string) => void
  close: () => void
  disabled?: boolean
  value: string
  style?: TextStyle
}

const Search = (props: Props) => {
  return (
    <>
      <View style={styles.searchContainer}>
        <View style={{ marginRight: 12, marginLeft: 6 }}>
          <Icon name="search" color="#EBC744"></Icon>
        </View>
        <TextInput
          editable={!props.disabled}
          placeholder={props.placeholder || ''}
          onChangeText={props.onChange}
          value={props.value}
          style={[styles.textInputClean, props.style]}
        ></TextInput>
        <TouchableOpacity
          style={{ marginRight: 6, marginLeft: 6 }}
          onPress={() => {
            props.onChange('')
            props.close()
          }}
        >
          <Icon name="close" color="#EBC744" width="24" height="24"></Icon>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#EBC744'
  },
  textInputClean: {
    width: '100%',
    height: 34,
    flexWrap: 'wrap',
    ...Platform.select({
      web: {
        outlineStyle: 'none'
      }
    })
  }
})

export default Search
