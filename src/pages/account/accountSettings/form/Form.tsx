import React, { FunctionComponent as FC } from 'react'
import { View } from 'react-native'
import Theme from 'components/theme'
import { shadow } from 'styles/shadow'
import { Formik } from 'formik'
import Formikcontrol from 'components/formikControl'
import Typography from 'components/typography'
import fonts from 'styles/fonts'
import useTranslation from 'hooks/useTranslation'

interface Props {}

const Card: FC<{ style: any }> = ({ children, style }) => {
  return (
    <Theme.View
      scheme="primary"
      style={[style, shadow, { borderRadius: 10, padding: 15, margin: 15 }]}
    >
      {children}
    </Theme.View>
  )
}
const ChangePasswordForm = () => {
  const { t } = useTranslation()
  return (
    <Card style={{ width: 400 }}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <>
          <Typography
            content={t('accSettingsPass')}
            fontFamily={fonts.baloo2SemiBold600}
          />
          <Typography content={t('accSettingsChangeYourPass')} />

          <Formikcontrol
            name="currentPassword"
            control="textInput"
            placeholder={t('accSettingsPassActual')}
            type="password"
          />
          <Formikcontrol
            name="newPassword"
            control="textInput"
            placeholder={t('accSettingsNewActual')}
            type="password"
          />
          <Formikcontrol
            name="repeatPassword"
            control="textInput"
            placeholder={t('accSettingsRepeatActual')}
            type="password"
          />
          <Formikcontrol
            control="buttonSubmit"
            type="primary"
            title={t('accSettingsChangePass')}
            style={{ alignSelf: 'center', margin: 20, maxWidth: 250 }}
          />
        </>
      </Formik>
    </Card>
  )
}
const EmailForm = () => {
  const { t } = useTranslation()
  return (
    <Card style={{ width: 400 }}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <>
          <Typography content="Email" fontFamily={fonts.baloo2SemiBold600} />
          <Typography content={t('accSettingsChangeYourEmail')} />
          <Formikcontrol
            name="email"
            control="textInput"
            placeholder={t('accSettingsEmail')}
            type="email"
          />

          <Formikcontrol
            name="password"
            control="textInput"
            placeholder={t('accSettingsPassActual')}
            type="password"
          />
          <Formikcontrol
            control="buttonSubmit"
            type="primary"
            title={t('accSettingsChangeEmail')}
            style={{ alignSelf: 'center', margin: 20, maxWidth: 250 }}
          />
        </>
      </Formik>
    </Card>
  )
}

const LinkAccount = () => {
  const { t } = useTranslation()
  return (
    <Card style={{ width: 400 }}>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <>
          <Typography content="Email" />
          <Typography content={t('accSettingsChangeYourEmail')} />
          <Formikcontrol
            name="email"
            control="textInput"
            placeholder="Correo"
            type="email"
          />

          <Formikcontrol
            name="password"
            control="textInput"
            placeholder={t('accSettingsPassActual')}
            type="password"
          />
          <Formikcontrol
            control="buttonSubmit"
            type="primary"
            title={t('accSettingsChangeEmail')}
            style={{ alignSelf: 'center', margin: 20, maxWidth: 250 }}
          />
        </>
      </Formik>
    </Card>
  )
}
const Form: FC<Props> = (props) => {
  return (
    <View
      style={{
        flexWrap: 'wrap',
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <EmailForm />
      <ChangePasswordForm />
      <LinkAccount />
    </View>
  )
}

export default Form
