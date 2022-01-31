import { useEffect, useRef } from 'react'

const usePopState = (onBack: () => void, unique?: boolean) => {
  const refState = useRef<any>()
  const pushState = () => {
    if (unique && refState.current) {
      return
    }
    refState.current = window.history.state
    window.history.pushState(null, null, window.location.pathname)
  }

  useEffect(() => {
    window.addEventListener('popstate', onBackButtonEvent, false)
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent, false)
    }
  }, [onBack])

  const onBackButtonEvent = (event: PopStateEvent) => {
    refState.current = undefined
    onBack()
  }

  return {
    pushState
  }
}

export default usePopState
