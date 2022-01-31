import Route from 'components/navigation/Route'
import React, { FC } from 'react'
import Auth, { AUTH } from 'pages/auth'
import Navigation from 'components/navigation'

interface Props {
  innerRef?: any
}

const Routes = () => {
  return (
    <Route>
      <Route name={AUTH} path="auth" component={Auth} options={{ title: 'Tumisoft' }} />
    </Route>
  )
}

const AuthNavigation: FC<Props> = ({ innerRef }) => {
  return <Navigation innerRef={innerRef}>{Routes()}</Navigation>
}

export default AuthNavigation
