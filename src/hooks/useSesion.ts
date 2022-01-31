import { useAppStore } from 'redux-core/hooks/useAppStore'
import { Oauth } from 'services/types'
const useSesion = () => {
  const store = useAppStore()

  const getSesion = () => {
    return store.getState()?.app.sesion as Oauth
  }

  return { getSesion }
}

export default useSesion
