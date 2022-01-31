import React, { FunctionComponent as FC } from 'react'
import { View } from 'react-native'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import Checkbox from 'components/checkbox'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import FormikControl from 'components/formikControl'
import * as Yup from 'yup'
import fonts from 'styles/fonts'
import HighlightText from 'components/highlightText'
import Form from 'components/formikControl/Form'
import SecurityField from 'components/securityField'
import { useAuthContext } from 'pages/auth/AuthContext'
import { ViewType } from 'pages/auth/types'
import useAppContext from 'hooks/useAppContext'
import useAuthentication from 'hooks/useAuthentication'
import Header from '../../components/Header'
import ContentPage from 'components/modal/ContentPage'

interface Props {}

type Values = {
  email: string
  password: string
  passwordConfirmation: string
  termsAndConditions: boolean
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Tu correo debe tener @ y un dominio. Ej.: ejemplo@gmail.com')
    .required('El correo es requerido'),
  password: Yup.string()
    .min(8, 'Tu contraseña debe tener mínimo 8 caracteres.')
    .matches(/[~`_!@#$%^&*()-+={}[\].:;"'<>,?|\\/]/g, 'Al menos un caracter especial')
    .matches(/[A-Z]/g, 'Al menos una letra mayúscula')
    .matches(/[a-z]/g, 'Al menos una letra minúscula')
    .matches(/[0-9]/g, 'Al menos un número')
    .required('La contraseña es requerida'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden. Intenta otra vez.')
    .required('La contraseña es requerida')
})

const CreateAccount: FC<Props> = () => {
  const { styles } = useResponsiveStyles(rStyles)
  const { singup } = useAuthentication()
  const { setViewType, refForms } = useAuthContext()
  const { showModal } = useAppContext()

  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      if (!values.termsAndConditions) {
        showModal({
          title: 'Aviso',
          message: 'Acepte los términos y condiciones',
          onAccept: () => {}
        })
        throw new Error('')
      }
      await singup(values)
      refForms.current[ViewType.createAccount] = values
      helpers.resetForm()
      setViewType(ViewType.messageValidateAccount)
    } catch (error) {}
    helpers.setSubmitting(false)
  }

  const onPressHighlight = (index: number) => {
    showModal(
      ContentPage,
      {
        onAccept: () => {}
      },
      {
        // TODO: Tipos temporales
        pageType: [1, 2][index]
      }
    )
  }

  const form = (formik: FormikProps<Values>) => {
    const showSecureField =
      !formik.errors.email && !!formik.errors.password && !!formik.values.password?.length

    return (
      <Form>
        <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Header
              title="Crea una cuenta"
              subTitle="o usa tu e-mail"
              typeProcess="register"
              hideButtons={!formik.errors.email && formik.dirty}
            />
            <FormikControl
              control="textInput"
              name="email"
              placeholder="Ingresa tu correo"
              type="email"
            />
            <FormikControl
              name={'password'}
              control="textInput"
              placeholder={'Ingresa tu contraseña'}
              type="password"
            />
            {showSecureField && <SecurityField value={formik.values.password} />}
            {!formik.errors.password && formik.dirty && (
              <FormikControl
                name={'passwordConfirmation'}
                control="textInput"
                placeholder={'Confirma tu contraseña'}
                type="password"
              />
            )}
            <FormikControl
              name="termsAndConditions"
              dependencies={[styles]}
              component={(props: any) => (
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    style={{ marginRight: 6 }}
                    type={'secondary'}
                    value={props.value}
                    onChange={(val) => props.onChange(val)}
                  />
                  <HighlightText
                    onPressHighlight={onPressHighlight}
                    highlightStyle={styles.highlight}
                    size={styles.hlText.fontSize}
                    style={{ lineHeight: 14, textAlign: 'left' }}
                    searchWords={['Términos de Servicio', 'Política de Privacidad']}
                    textToHighlight={
                      'Al registrarme, confirmo que acepto los Términos de Servicio y la Política de Privacidad'
                    }
                  />
                </View>
              )}
            />
          </View>
          <View style={styles.buttonContainer}>
            <FormikControl
              control="buttonSubmit"
              title={'Crear'}
              type={'primary'}
              style={styles.button}
            />
          </View>
        </View>
      </Form>
    )
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordConfirmation: '',
        termsAndConditions: false
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      children={form}
    />
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
  checkbox: {
    fontWeight: 400,
    lineHeight: 22
  },
  checkboxContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 16
  },
  container: {
    flex: 1
  },
  hlText: {
    fontSize: `${fontSize.xs} lg:${fontSize.sm}`
  },
  highlight: {
    color: colors.purple,
    fontFamily: fonts.baloo2SemiBold600,
    fontSize: `${fontSize.xs} lg:${fontSize.sm}`
  }
})

export default CreateAccount
