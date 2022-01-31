import CompanySetupForm from './form'
import React, { FunctionComponent as FC } from 'react'
import Navigator from '../@components/Navigator'

interface Props {}

const CompanySetup: FC<Props> = (props) => {
  return (
    <Navigator>
      <CompanySetupForm />
    </Navigator>
  )
}

export default CompanySetup
