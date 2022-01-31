import React, { FunctionComponent as FC } from 'react'
import { SETTINGS } from '../settings'
import NavigationPanel from 'components/navigationPanel'
interface Props {
  optionIndex: number
}

const Navigator: FC<Props> = (props) => {
  return (
    <NavigationPanel
      optionIndex={0}
      name="Configuración"
      options={[{ text: 'General', routeName: SETTINGS }]}
    >
      {props.children}
    </NavigationPanel>
  )
}

export default Navigator
