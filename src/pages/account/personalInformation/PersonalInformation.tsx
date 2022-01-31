import UserForm from './form'
import React, { FunctionComponent as FC } from 'react'
import Navigator from '../@components/Navigator'

interface Props {}

const PersonalInformation: FC<Props> = (props) => {
  return (
    <Navigator optionIndex={0}>
      <UserForm />
    </Navigator>
  )
}

export default PersonalInformation
