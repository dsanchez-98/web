import React, { FunctionComponent as FC } from 'react'
import { useAppSelector } from 'redux-core/hooks'
import appNavigation from './appNavigation'
import authNavigation from './authNavigation'
import firstStepsNavigation from './firstStepsNavigation'
import { navigationRef } from 'navigation/helpers'

interface Props {}
const isEqual = (left: string, rigtht: string) => left === rigtht

const Navigator: FC<Props> = (props) => {
  const token = useAppSelector((s) => s?.app.sesion.accessToken, isEqual)
  const phoneVerified = useAppSelector((s) => s?.app.sesion.phoneVerified, isEqual)
  const initialConfig = useAppSelector((s) => s?.app.sesion.initialConfig, isEqual)

  let Navigation: any = authNavigation

  if (token && phoneVerified) {
    if (initialConfig) {
      Navigation = appNavigation
    } else {
      Navigation = firstStepsNavigation
    }
  }

  return <Navigation innerRef={navigationRef} />
}

export default Navigator
