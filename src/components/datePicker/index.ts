import { withLazy } from 'navigation/helpers'
import { lazy } from 'react'

const Form = lazy(() => import('./DatePicker'))

export default withLazy(Form)
