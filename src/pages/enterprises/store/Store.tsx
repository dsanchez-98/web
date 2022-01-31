import StoreForm from './form'
import React, { FunctionComponent as FC } from 'react'
import Navigator from '../@components/Navigator'

interface Props {}

const Store: FC<Props> = (props) => {
  return (
    <Navigator>
      <StoreForm />
    </Navigator>
  )
}

export default Store
