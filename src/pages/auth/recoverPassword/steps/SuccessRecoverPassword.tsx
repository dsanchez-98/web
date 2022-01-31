import React from 'react'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import { View } from 'react-native'
import useTranslation from 'hooks/useTranslation'
import { useAuthContext } from 'pages/auth/AuthContext'
import Button from 'components/button'
import fonts from 'styles/fonts'
import Typography from 'components/typography'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'

const SuccessRecoverPassword = () => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  const { restartAll } = useAuthContext()
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.titleContainer}>
          <Typography
            color={colors.primary}
            content={t('listo')}
            disableThemeColor
            size={styles.title.fontSize}
            fontFamily={fonts.baloo2Bold700}
          />
          <Typography
            content={t('successRecoverPass')}
            disableThemeColor
            fontFamily={fonts.baloo2Medium500}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title={t('volver')}
          type={'primary'}
          style={styles.button}
          onPress={() => {
            restartAll()
          }}
        />
      </View>
    </View>
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
  title: {
    fontSize: `${fontSize.large} lg:${fontSize.extraLarge}`
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SuccessRecoverPassword
