import React, { FunctionComponent as FC } from 'react'
import { PERSONAL_INFORMATION } from '../personalInformation'
import { ACCOUNT_SETTINGS } from '../accountSettings'
import { CURRENT_PLAN } from '../currentPlan'
import NavigationPanel from 'components/navigationPanel'
import { useNavigation } from '@react-navigation/native'
interface Props {
  optionIndex: number
}

const Navigator: FC<Props> = (props) => {
  const nav = useNavigation()
  const { routes, index } = nav.getState()
  const currentRoute = routes[index]
  const currentRouteName = currentRoute.name
  const options = [
    { text: 'Datos personales', routeName: PERSONAL_INFORMATION },
    { text: 'Configuración de la cuenta', routeName: ACCOUNT_SETTINGS },
    { text: 'Plan Actual', routeName: CURRENT_PLAN }
  ]
  return (
    <NavigationPanel
      optionIndex={options.findIndex(({ routeName }) => currentRouteName === routeName)}
      name="Mi cuenta"
      options={options}
    >
      {props.children}
    </NavigationPanel>
  )
}

export default Navigator
