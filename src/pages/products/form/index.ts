import { withLazy } from 'navigation/helpers'
import { lazy } from 'react'

export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const SHOW_PRODUCT = 'SHOW_PRODUCT'

const ProductsForm = lazy(() => import('./Form'))

export default withLazy(ProductsForm)
