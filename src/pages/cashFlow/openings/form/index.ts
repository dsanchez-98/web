import { withLazy } from 'navigation/helpers'
import { lazy } from 'react'

export const CREATE_OPENING = 'CREATE_OPENING'
export const SHOW_OPENING = 'SHOW_OPENING'

const CustomersForm = lazy(() => import('./Form'))

export default withLazy(CustomersForm)
