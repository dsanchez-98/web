import { withLazy } from 'navigation/helpers'
import { lazy } from 'react'

export const CREATE_INCOME = 'CREATE_INCOME'
export const SHOW_INCOME = 'SHOW_INCOME'

const CustomersForm = lazy(() => import('./Form'))

export default withLazy(CustomersForm)
