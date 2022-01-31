import React, { FC } from 'react'
import Navigator from '../@components/Navigator'
import AccountSettingsForm from './form'

interface Props {}

const AccountSettings: FC<Props> = (props) => {
  return (
    <Navigator optionIndex={1}>
      <AccountSettingsForm />
    </Navigator>
  )
}

export default AccountSettings
