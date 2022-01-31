import { withLazy } from 'navigation/helpers'
import { lazy } from 'react'

export const CREATE_CASH_DESK_CLOSING = 'CREATE_CASH_DESK_CLOSING'

const CustomersForm = lazy(() => import('./Form'))

export default withLazy(CustomersForm)
