import { withLazy } from 'navigation/helpers'
import { lazy } from 'react'
export const CREATE_VOUCHER = 'CREATE_VOUCHER'
export const SHOW_VOUCHER = 'SHOW_VOUCHER'

const VoucherForm = lazy(() => import('./Form'))

export default withLazy(VoucherForm)
