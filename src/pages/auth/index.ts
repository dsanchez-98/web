import { withLazy } from 'navigation/helpers'
import { lazy } from 'react'

export const AUTH = 'AUTH'

const Auth = lazy(() => import('./Auth'))

export default withLazy(Auth, { showIcon: true })
