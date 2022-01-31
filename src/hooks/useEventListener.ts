import { useRef } from 'react'

const useEventListener = () => {
  const refListeners = useRef<{ [key: string]: Set<any> }>({})
  const addEventListener = (name: string, listener: (value: any) => void) => {
    if (!refListeners.current[name]) {
      refListeners.current[name] = new Set()
    }
    refListeners.current[name].add(listener)
    const remove = () => {
      refListeners.current[name].delete(listener)
    }
    return remove
  }

  const emit = (name: string, value: any) => {
    if (!refListeners.current[name]) {
      return
    }
    refListeners.current[name].forEach((listener) => {
      listener(value)
    })
  }

  return { addEventListener, emit }
}

export default useEventListener
