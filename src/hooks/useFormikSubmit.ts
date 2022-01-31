import { useRef } from 'react'

const useFormikSubmit = () => {
  const ref = useRef<any>(null)
  const _resolve = useRef(() => {})
  const _reject = useRef((reason: any) => {})

  const handleSubmit = () =>
    new Promise<void>((resolve, reject) => {
      _resolve.current = resolve
      _reject.current = reject
      ref.current.handleSubmit()
    })
  return { ref, handleSubmit, resolve: _resolve, reject: _reject }
}

export default useFormikSubmit
