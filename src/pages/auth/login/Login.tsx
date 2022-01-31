import React, { FunctionComponent as FC } from 'react'
import { View } from 'react-native'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import Checkbox from 'components/checkbox'
import Typography from 'components/typography'
import fontSize from 'styles/fontSize'
import FormikControl from 'components/formikControl'
import fonts from 'styles/fonts'
import { Formik, FormikHelpers } from 'formik'
import Form from 'components/formikControl/Form'
import { useAuthContext } from '../AuthContext'
import { ViewType } from '../types'
import * as Yup from 'yup'
import useAuthentication from 'hooks/useAuthentication'
import Header from '../components/Header'
import useTranslation from 'hooks/useTranslation'

interface Props {}
type Values = {
  email: string
  password: string
  remember: boolean
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Tu correo debe tener @ y un dominio. Ej.: ejemplo@gmail.com')
    .required('El correo es requerido'),
  password: Yup.string()
    .min(8, 'Tu contraseña debe tener mínimo 8 caracteres.')
    .required('La contraseña es requerida')
})

const Login: FC<Props> = () => {
  const { login } = useAuthentication()
  const { styles } = useResponsiveStyles(rStyles)
  const { setViewType, refForms } = useAuthContext()
  const { t } = useTranslation()

  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    const data = {
      email: values.email,
      password: values.password
    }
    try {
      await login(data)
    } catch (error) {
      console.log(error)
    }
    helpers.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={refForms.current[ViewType.login] || { email: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleSubmit }) => {
        refForms.current[ViewType.login] = values
        return (
          <Form onSubmit={handleSubmit}>
            <View style={styles.container}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Header
                  title={t('loginEnterTumi')}
                  subTitle={t('loginOrUseYour')}
                  typeProcess="login"
                />
                <FormikControl
                  control="textInput"
                  name={'email'}
                  type="email"
                  placeholder={t('loginEnterYourMail')}
                />
                <FormikControl
                  control="textInput"
                  name={'password'}
                  placeholder={t('loginEnterYourPass')}
                  type="password"
                />
                {/* */}
                <FormikControl
                  name="remember"
                  dependencies={[styles]}
                  component={(props: any) => (
                    <View style={styles.containerBottom}>
                      <View style={styles.checkboxContainer}>
                        <Checkbox
                          style={{ marginRight: 6 }}
                          type={'primary'}
                          value={props.value}
                          onChange={(val) => props.onChange(val)}
                        />
                        <Typography
                          size={fontSize.sm}
                          content={t('loginRememberMe')}
                          onPress={() => props.onChange(!props.value)}
                        />
                      </View>
                      <Typography
                        content={t('loginForgetPass')}
                        fontFamily={fonts.baloo2Medium500}
                        style={{ alignSelf: 'center' }}
                        size={fontSize.sm}
                        onPress={() => {
                          setViewType(ViewType.requestResetPassword)
                        }}
                      />
                    </View>
                  )}
                />
              </View>
              <View style={[styles.buttonContainer]}>
                <FormikControl
                  control="buttonSubmit"
                  style={styles.button}
                  title={'Ingresar'}
                  type={'primary'}
                />
              </View>
            </View>
          </Form>
        )
      }}
    </Formik>
  )
}
const rStyles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40
  },
  button: {
    width: '136 md:152'
  },
  checkboxContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16
  },
  container: {
    flex: 1
  },
  containerBottom: {
    flexDirection: 'column md:row',
    justifyContent: 'center md:space-between'
  },
  text: {
    fontSize: `${fontSize.sm} md:${fontSize.md}`
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontSize: `${fontSize.large} md:${fontSize.extraLarge}`
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Login
