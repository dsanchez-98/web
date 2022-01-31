/* eslint-disable no-extra-semi */
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import useAppContext from './useAppContext'

const useImagePicker = () => {
  const { showModal } = useAppContext()
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          showModal({
            message: 'Sorry, we need camera roll permissions to make this work!',
            onAccept: () => {}
          })
        }
      }
    })()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return {
    pickImage,
    image
  }
}

export default useImagePicker
