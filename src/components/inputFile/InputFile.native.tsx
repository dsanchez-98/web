import React, { FC } from 'react'
import Icon from 'components/icon'
import { TouchableOpacity } from 'react-native'
import { InputFileProps } from './type'

import ImagePicker from 'react-native-image-picker'

const handleChoosePhoto = () => {
  ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
    console.log('response', response)
  })
}

const InputFile: FC<InputFileProps> = () => {
  return (
    <TouchableOpacity
      onPress={handleChoosePhoto}
      style={{ position: 'absolute', right: 5, bottom: 5 }}
    >
      <Icon name={'camera'} />
    </TouchableOpacity>
  )
}

export default InputFile
