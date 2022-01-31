import { withLazy } from 'navigation/helpers'
import { lazy } from 'react'

const Form = lazy(() => import('./Form'))

export default withLazy(Form)
