import { useEffect } from 'react'
import { Platform } from 'react-native'

const useKeyPress = (keyCode: number, e: () => void) => {
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleEsc = (event: any) => {
        if (event.keyCode === keyCode) {
          e()
        }
      }
      window.addEventListener('keyup', handleEsc)

      return () => {
        window.removeEventListener('keyup', handleEsc)
      }
    }
  }, [])
}
export default useKeyPress
