import { useCallback } from 'react'
import { BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

const useBackHandler = (onBackPress: () => boolean) => {
  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [onBackPress])
  )
}
export default useBackHandler
