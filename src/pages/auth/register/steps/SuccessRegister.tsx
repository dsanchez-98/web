import React from 'react'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import { View } from 'react-native'
import useTranslation from 'hooks/useTranslation'
import Typography from 'components/typography'
import colors from 'styles/colors'
import fonts from 'styles/fonts'
import Button from 'components/button'
import { useAppDispatch } from 'redux-core/hooks'
import { actionSetSesion } from 'redux-core/actions/sesion.action'

const SuccessRegister = () => {
  const { styles } = useResponsiveStyles(rStyles)
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.textContainer}>
        <Typography
          color={colors.primary}
          size={styles.blueText.fontSize}
          content={t('listo')}
          fontFamily={fonts.baloo2Bold700}
          disableThemeColor
        />
        <View>
          <Typography
            color={colors.black}
            size={styles.grayText.fontSize}
            content={t('clickOnReady')}
            fontFamily={fonts.baloo2Medium500}
            style={styles.grayText}
            disableThemeColor
          />
        </View>
      </View>
      <View style={styles.bottomViewContainer}>
        <Button
          type="primary"
          title={t('ingresar')}
          style={styles.backButtonContainer}
          onPress={() => {
            dispatch(actionSetSesion({ phoneVerified: true }))
          }}
        />
      </View>
    </View>
  )
}

const rStyles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  blueText: {
    fontSize: '18 md:28'
  },
  grayText: {
    fontSize: '14 lg:16',
    textAlign: 'center',
    marginTop: '8'
  },
  backButtonContainer: {
    width: 152,
    height: '34 md:40',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40
  }
})

export default SuccessRegister
