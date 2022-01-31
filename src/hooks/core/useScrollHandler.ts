import { useRef } from 'react'
import { ScrollView } from 'react-native'

const useScrollHandler = () => {
  const ref = useRef<ScrollView>(null)

  const scrollTo = (options: { x?: number; y?: number; animated?: boolean }) => {
    ref.current?.scrollTo(options)
  }

  const scrollToEnd = (animated = true) => {
    ref.current?.scrollToEnd({ animated })
  }

  const scrollToStart = (animated = true) => {
    ref.current?.scrollTo({ x: 0, y: 0, animated })
  }

  return { ref, scrollTo, scrollToEnd, scrollToStart }
}

export default useScrollHandler
