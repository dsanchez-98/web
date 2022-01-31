import { withLazy } from 'navigation/helpers'
import { lazy } from 'react'

export const CREATE_DEVICE = 'CREATE_DEVICE'
export const SHOW_DEVICE = 'SHOW_DEVICE'

const DevicesForm = lazy(() => import('./Form'))

export default withLazy(DevicesForm)
