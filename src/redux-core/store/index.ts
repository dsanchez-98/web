import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistConfig } from 'redux-persist/es/types'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import { environment } from 'constants/core'
import storage from './storage'

export const createReduxStore = () => {
  const persistconfig: PersistConfig = {
    key: environment.storageKey,
    storage,
    transforms: [
      encryptTransform({
        secretKey: environment.persistSecretKey
      })
    ]
  }

  const persistRedurer = persistReducer(persistconfig, rootReducer)
  const store = createStore(persistRedurer, applyMiddleware())
  const persistor = persistStore(store)
  return { store, persistor }
}
