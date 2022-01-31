import React from 'react'
import { View } from 'react-native'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import FormikControl from 'components/formikControl'
import Typography from 'components/typography'
import * as Yup from 'yup'
import Form from 'components/formikControl/Form'
import { useAuthContext } from '../../AuthContext'
import { ViewType } from '../../types'
import fonts from 'styles/fonts'
import Button from 'components/button'
import useTranslation, { t } from 'hooks/useTranslation'
import useAuthentication from 'hooks/useAuthentication'

type Values = {
  email: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email(t('correoDebeTenerDominio')).required(t('correoRequerido'))
})

const RequestResetPassword = () => {
  const { styles } = useResponsiveStyles(rStyles)
  const { setViewType, refForms } = useAuthContext()
  const { requestResetPasword } = useAuthentication()
  const { t } = useTranslation()
  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      await requestResetPasword(values)
      refForms.current[ViewType.requestResetPassword] = values
      helpers.resetForm()
      setViewType(ViewType.messageValidateAccountResetPassword)
    } catch (error) {}
    helpers.setSubmitting(false)
  }

  const form = (formik: FormikProps<Values>) => {
    return (
      <Form>
        <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.titleContainer}>
              <Typography
                color={colors.primary}
                content={t('recuperarContraseña')}
                disableThemeColor
                size={styles.title.fontSize}
                fontFamily={fonts.baloo2Bold700}
              />
              <Typography
                content={t('ingresaTuCorreoTumisoft')}
                disableThemeColor
                fontFamily={fonts.baloo2Medium500}
              />
            </View>
            <FormikControl
              control="textInput"
              name="email"
              placeholder={t('ingresaTuCorreo')}
              iconNameLeft="user"
              keyboardType="email-address"
            />
            <Typography
              content={t('emailAdvice')}
              style={{ marginTop: 20 }}
              disableThemeColor
              fontFamily={fonts.baloo2Regular400}
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Button
                title={t('volver')}
                type={'secondaryBlue'}
                style={styles.button}
                onPress={() => {
                  setViewType(ViewType.login)
                }}
              />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <FormikControl
                control="buttonSubmit"
                title={t('send')}
                type={'primary'}
                style={styles.button}
              />
            </View>
          </View>
        </View>
      </Form>
    )
  }

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      children={form}
    />
  )
}

const rStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column sm:row',
    paddingVertical: 40
  },
  button: {
    width: '136 md:152'
  },
  buttonRestart: {
    width: '200 '
  },
  checkbox: {
    fontWeight: 400,
    lineHeight: 22
  },
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16
  },
  item: {
    width: '100%'
  },
  link: {
    fontWeight: 600,
    lineHeight: '14 md:16',
    textAlign: 'left'
  },
  textContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 72
  },
  title: {
    fontSize: `${fontSize.large} lg:${fontSize.extraLarge}`
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
})

export default RequestResetPassword
