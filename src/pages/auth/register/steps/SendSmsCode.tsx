import React from 'react'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import { View } from 'react-native'
import useTranslation from 'hooks/useTranslation'
import fontSize from 'styles/fontSize'
import colors from 'styles/colors'
import Typography from 'components/typography'
import fonts from 'styles/fonts'
import { useAuthContext } from 'pages/auth/AuthContext'
import { ViewType } from 'pages/auth/types'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import FormikControl from 'components/formikControl'
import * as Yup from 'yup'
import 'helpers/yup'
import useAuthentication from 'hooks/useAuthentication'
import Steps from 'pages/auth/components/Steps'
import Button from 'components/button'

type Values = {
  phone: string
}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const SendSmsCode = () => {
  const { t } = useTranslation()
  const { styles } = useResponsiveStyles(rStyles)
  const { setViewType, refForms } = useAuthContext()
  const { sendMessagePhone, logout } = useAuthentication()

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required(t('sendSmsCodeValOne'))
      .matches(phoneRegExp, t('sendSmsCodeValTwo'))
  })

  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      await sendMessagePhone(values)
      refForms.current[ViewType.sendSmsCode] = values
      setViewType(ViewType.verifySmsCode)
    } catch (error) {}
    helpers.setSubmitting(false)
  }

  const form = (formikProps: FormikProps<Values>) => {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Steps currentStep={1} />
          <View style={styles.blueTextContainer}>
            <Typography
              color={colors.primary}
              size={styles.blueText.fontSize}
              fontFamily={fonts.baloo2Bold700}
              content={t('verifica')}
              disableThemeColor
            />
            <Typography
              color={colors.black}
              size={styles.grayText.fontSize}
              style={styles.grayText}
              fontFamily={fonts.baloo2Medium500}
              content={t('click')}
              disableThemeColor
            />
          </View>
          <View style={styles.inputPhoneContainer}>
            <FormikControl
              control="textInput"
              name="phone"
              placeholder={t('sendSmsCodePhone')}
              type="phone"
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Button
            type="secondaryBlue"
            title={t('sendSmsCodeGetOut')}
            style={{ width: 150 }}
            onPress={() => {
              logout()
            }}
          />
          <FormikControl
            control="buttonSubmit"
            type="primary"
            title={t('siguiente')}
            style={styles.btnNextBlockContainer}
          />
        </View>
      </View>
    )
  }

  return (
    <Formik
      initialValues={{ phone: '' }}
      onSubmit={onSubmit}
      children={form}
      validationSchema={validationSchema}
      validateOnMount
      enableReinitialize
    />
  )
}

const rStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  textNumberText: {
    fontSize: '12 md:24'
  },
  blueText: {
    fontSize: `${fontSize.large} md:${fontSize.xl} lg:${fontSize.extraLarge}`
  },
  stepsContainer: {
    marginTop: '16 lg:24',
    flexDirection: 'row',
    alignItems: 'center'
  },
  lineActiveContainer: {
    // width: '100 md:201 lg:240',
    flex: 3,
    height: '1',
    backgroundColor: '#8C4EF6'
  },
  lineInactiveContainer: {
    // width: '100 md:201 lg:240',
    flex: 3,
    height: '1',
    backgroundColor: '#D1D4DD'
  },
  shortLineContainer: {
    // width: '16 md:40 lg:80',
    flex: 1,
    height: '1',
    backgroundColor: '#8C4EF6'
  },
  circleActiveContainer: {
    backgroundColor: '#8C4EF6',
    width: '24 md:40',
    height: '24 md:40',
    borderRadius: '12 md:20',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleUnactiveContainer: {
    backgroundColor: '#FFFFFF',
    width: '24 md:40',
    height: '24 md:40',
    borderRadius: '12 md:20',
    borderWidth: 1,
    borderColor: '#8C4EF6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blueTextContainer: {
    marginTop: '16 lg:58'
  },
  grayText: {
    fontSize: '14 md:16',
    marginTop: '8',
    flexWrap: 'wrap'
  },
  inputPhoneContainer: {
    marginTop: '32 md:64 lg:32'
  },
  flagContainer: {
    height: '40',
    justifyContent: 'center',
    marginLeft: '8'
  },
  errorContainer: {
    marginRight: '50',
    height: '40',
    justifyContent: 'center'
  },
  btnNextBlockContainer: {
    width: '152',
    height: '40'
  },
  bottomContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingBottom: 40,
    flexDirection: 'row'
  }
})

export default SendSmsCode
