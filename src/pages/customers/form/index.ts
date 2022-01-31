import { withLazy } from 'navigation/helpers'
import { lazy } from 'react'

export const CREATE_CUSTOMER = 'CREATE_CUSTOMER'
export const SHOW_CUSTOMER = 'SHOW_CUSTOMER'
export const CREATE_PROVIDER = 'CREATE_PROVIDER'
export const SHOW_PROVIDER = 'SHOW_PROVIDER'

const CustomersForm = lazy(() => import('./Form'))

export default withLazy(CustomersForm)
