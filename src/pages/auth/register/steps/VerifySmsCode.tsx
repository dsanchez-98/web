import React from 'react'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import { View } from 'react-native'
import useTranslation from 'hooks/useTranslation'
import Timer from 'components/timer'
import Typography from 'components/typography'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import fonts from 'styles/fonts'
import { useAuthContext } from 'pages/auth/AuthContext'
import { ViewType } from 'pages/auth/types'
import { Formik, FormikHelpers, FormikProps } from 'formik'
import FormikControl from 'components/formikControl'
import useAuthentication from 'hooks/useAuthentication'
import Steps from 'pages/auth/components/Steps'

type Values = {
  code: string
}

const VerifySmsCode = () => {
  const { t } = useTranslation()
  const { styles } = useResponsiveStyles(rStyles)
  const { setViewType, refForms } = useAuthContext()
  const { verifyPhone, sendMessagePhone } = useAuthentication()

  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    try {
      await verifyPhone(values)
      setViewType(ViewType.successRegister)
    } catch (error) {}
    helpers.setSubmitting(false)
  }

  const form = (formikProps: FormikProps<Values>) => {
    refForms.current[ViewType.verifySmsCode] = formikProps.values
    return (
      <View style={styles.container}>
        <Steps currentStep={2} />
        <View style={{ flex: 1 }}>
          <View style={styles.blueTextContainer}>
            <Typography
              color={colors.primary}
              size={styles.blueText.fontSize}
              content={t('verifica')}
              fontFamily={fonts.baloo2Bold700}
              disableThemeColor
            />
            <Typography
              color={colors.black}
              size={styles.grayText.fontSize}
              content={t('enviado') + ' ' + refForms.current[ViewType.sendSmsCode]?.phone}
              fontFamily={fonts.baloo2Medium500}
              style={styles.grayText}
              disableThemeColor
            />
          </View>
          <View style={styles.inputCodesContainer}>
            <FormikControl name="code" control="inputCode" textToValidate="123456" />
          </View>
          <View style={styles.timerContainer}>
            <Timer
              value={12}
              text={t('podrasPedir') + ' '}
              unit={t('segundos')}
              onRestart={() => {
                formikProps.handleChange('code')('')
                sendMessagePhone({ phone: refForms.current[ViewType.sendSmsCode]?.phone })
              }}
            />
            <Typography
              onPress={() => setViewType(ViewType.sendSmsCode)}
              color={colors.primary}
              size={styles.textChangePhone.fontSize}
              content={t('hazClickCambiar')}
              fontFamily={fonts.baloo2Medium500}
              disableThemeColor
            />
          </View>
        </View>
        <View style={styles.bottomViewContainer}>
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
      initialValues={refForms.current[ViewType.verifySmsCode] || { code: '' }}
      onSubmit={onSubmit}
      children={form}
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
  textChangePhone: {
    fontSize: '14 md:16'
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
    marginTop: '16 lg:48'
  },
  blueText: {
    fontSize: `${fontSize.large} md:${fontSize.xl} lg:${fontSize.extraLarge}`
  },
  grayText: {
    fontSize: '14 md:16',
    marginTop: '8',
    flexWrap: 'wrap'
  },
  inputCodesContainer: {
    marginTop: '24 md:64 lg:48'
  },
  btnNextBlockContainer: {
    width: '152',
    height: '34 md:40'
  },
  timerContainer: {
    marginTop: '16 md:40'
  },
  bottomViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40
  }
})

export default VerifySmsCode
