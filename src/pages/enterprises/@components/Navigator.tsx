import React, { FunctionComponent as FC } from 'react'
import { COMPANY_SETUP } from '../companySetup'
import { STORE } from '../store'
import NavigationPanel from 'components/navigationPanel'
import { useNavigation } from '@react-navigation/native'
interface Props {}

const Navigator: FC<Props> = (props) => {
  const nav = useNavigation()
  const { routes, index } = nav.getState()
  const currRoute = routes[index]
  const currRouteName = currRoute.name
  const currRouteParams = currRoute.params as any
  const options = [
    { text: 'Configurar empresa', routeName: COMPANY_SETUP },
    { text: 'TUMISOFT BARRANCO', routeName: STORE, params: { id: 100 } },
    { text: 'TUMISOFT GAMARRA', routeName: STORE, params: { id: 101 } }
  ]
  return (
    <NavigationPanel
      optionIndex={options.findIndex(({ routeName, params }) => {
        if (params) {
          return params.id === currRouteParams.id
        }
        return currRouteName === routeName
      })}
      name="Empresa"
      options={options}
    >
      {props.children}
    </NavigationPanel>
  )
}

export default Navigator
