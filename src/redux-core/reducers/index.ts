import { combineReducers } from 'redux'
import sesionReducer from './sesion.reducer'
import themeReducer from './theme.reducer'
import { environment } from 'constants/core'
import { REMOVE_SESION } from 'redux-core/actions/sesion.action'
import storage from 'redux-core/store/storage'

const appReducer = combineReducers({
  app: combineReducers({ sesion: sesionReducer, theme: themeReducer })
})

export type RootState = ReturnType<typeof appReducer> | undefined

const rootReducer = (state: any, action: any) => {
  if (action.type === REMOVE_SESION) {
    state = undefined
    storage.removeItem(`persist:${environment.storageKey}`)
  }

  return appReducer(state, action)
}

export default rootReducer
