import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from '../reducers'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
