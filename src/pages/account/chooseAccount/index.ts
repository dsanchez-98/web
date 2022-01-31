import { withLazy } from 'navigation/helpers'
import { lazy } from 'react'

export const CHOOSEACC = 'CHOOSEACC'

const ChooseAccount = lazy(() => import('./ChooseAccount'))

export default withLazy(ChooseAccount, { showIcon: true })
