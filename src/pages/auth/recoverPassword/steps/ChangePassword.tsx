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
import fonts from 'styles/fonts'
import SecurityField from 'components/securityField'
import { useAuthContext } from 'pages/auth/AuthContext'
import { ViewType } from 'pages/auth/types'
import { useRoute } from '@react-navigation/native'
import useAuthentication from 'hooks/useAuthentication'
import useTranslation from 'hooks/useTranslation'

type Values = {
  email: string
  password: string
  passwordConfirmation: string
  token: string
}

const ChangePassword = () => {
  const { params } = useRoute<any>()
  const { styles } = useResponsiveStyles(rStyles)
  const { changePassword } = useAuthentication()
  const { refForms, setViewType } = useAuthContext()
  const { t } = useTranslation()

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, t('recoverValPassOne'))
      .matches(/[~`_!@#$%^&*()-+={}[\].:;"'<>,?|\\/]/g, t('recoverValPassTwo'))
      .matches(/[A-Z]/g, t('recoverValPassThree'))
      .matches(/[a-z]/g, t('recoverValPassFour'))
      .matches(/[0-9]/g, t('recoverValPassFive'))
      .required(t('recoverValPassReq')),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], t('recoverValConfirmPass'))
      .required(t('recoverValPassReq')),
    email: Yup.string().email(t('recoverValEmail')).required(t('recoverValEmailReq'))
  })

  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      await changePassword(values)
      setViewType(ViewType.successRecoverPassword)
    } catch (error) {}
    helpers.setSubmitting(false)
  }

  const form = (formik: FormikProps<Values>) => {
    refForms.current[ViewType.changePassword] = formik.values
    const showSecureField =
      !formik.errors.email && !!formik.errors.password && !!formik.values.password?.length
    return (
      <Form>
        <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={styles.titleContainer}>
              <Typography
                color={colors.primary}
                content={t('recoverNewPass')}
                disableThemeColor
                size={styles.title.fontSize}
                fontFamily={fonts.baloo2Bold700}
              />
            </View>
            <FormikControl
              name="password"
              control="textInput"
              placeholder={t('recoverEnterNewPass')}
              type="password"
            />
            {showSecureField && <SecurityField value={formik.values.password} />}
            {!formik.errors.password && (
              <FormikControl
                name="passwordConfirmation"
                control="textInput"
                placeholder={t('recoverConfirmPass')}
                type="password"
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <FormikControl
              control="buttonSubmit"
              title={t('recoverRestorePass')}
              type={'primary'}
              style={styles.buttonRestart}
            />
          </View>
        </View>
      </Form>
    )
  }

  return (
    <Formik
      initialValues={
        refForms.current[ViewType.changePassword] || {
          email: params?.email,
          password: '',
          passwordConfirmation: '',
          token: params?.token
        }
      }
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      children={form}
      validateOnMount
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
    paddingHorizontal: 40,
    paddingBottom: 40
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

export default ChangePassword
