import { withLazy } from 'navigation/helpers'
import { lazy } from 'react'

export const CREATE_WITHDRAWAL = 'CREATE_WITHDRAWAL'
export const SHOW_WITHDRAWAL = 'SHOW_WITHDRAWAL'

const CustomersForm = lazy(() => import('./Form'))

export default withLazy(CustomersForm)
