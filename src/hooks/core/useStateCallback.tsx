import { useEffect, useRef, useState, SetStateAction } from 'react'

type Callback<S> = (state: S) => void | (() => void | undefined)

type DispatchWithCallback<A> = (value: A, callback?: Callback<A>) => void

function useStateWithCallback<S>(
  initialValue: S,
  config?: { delay: number }
): [S, DispatchWithCallback<SetStateAction<S>>] {
  const callbackRef = useRef<any>(null)

  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (typeof callbackRef.current === 'function') {
      const run = () => {
        callbackRef.current(value)
        callbackRef.current = null
      }
      config?.delay ? setTimeout(run, config.delay) : run()
    }
  }, [value])

  return [
    value,
    (newValue, callback) => {
      callbackRef.current = callback
      return setValue(newValue)
    }
  ]
}
export default useStateWithCallback
