import React, { FunctionComponent as FC } from 'react'
import Navigator from '../@components/Navigator'
import CurrentPlanForm from './form'

interface Props {}

const CurrentPlan: FC<Props> = (props) => {
  return (
    <Navigator optionIndex={2}>
      <CurrentPlanForm />
    </Navigator>
  )
}

export default CurrentPlan
