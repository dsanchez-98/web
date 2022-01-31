import React, { FC } from 'react'
import Route from 'components/navigation/Route'
import UserForm, { USER_FORM } from 'pages/firstSteps/user'
import EnterpriseForm, { ENTERPRISE_FORM } from 'pages/firstSteps/enterprise'
import StoreForm, { STORE_FORM } from 'pages/firstSteps/store'
import Navigation from 'components/navigation'
import useTranslation from 'hooks/useTranslation'
interface Props {
  innerRef?: any
}

const Routes = () => {
  const { t } = useTranslation()
  return (
    <Route>
      <Route path="first-steps" options={{ title: t('firstStepsTitle') }}>
        <Route
          path={'user'}
          name={USER_FORM}
          component={UserForm}
          options={{ title: t('firstStepsUserTitle'), unmountOnBlur: true }}
        />
        <Route
          path={'enterprise'}
          name={ENTERPRISE_FORM}
          component={EnterpriseForm}
          options={{ title: t('firstStepsEnterTitle'), unmountOnBlur: true }}
        />
        <Route
          path={'store'}
          name={STORE_FORM}
          component={StoreForm}
          options={{ title: t('firstStepsStoreTitle'), unmountOnBlur: true }}
        />
      </Route>
    </Route>
  )
}

const FirstStepsNavigation: FC<Props> = ({ innerRef }) => {
  return <Navigation innerRef={innerRef}>{Routes()}</Navigation>
}

export default FirstStepsNavigation
