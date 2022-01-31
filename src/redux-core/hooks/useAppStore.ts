import { useStore } from 'react-redux'
import { Store } from 'redux'
import type { RootState } from '../reducers'

export const useAppStore: () => Store<RootState, any> = () => useStore()
