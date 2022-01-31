/* eslint-disable react/jsx-key */
import React from 'react'
import { View } from 'react-native'
import { StyleSheet, useResponsiveStyles } from 'components/responsiveLayout'
import colors from 'styles/colors'
import fontSize from 'styles/fontSize'
import Typography from 'components/typography'
import { useAuthContext } from '../../AuthContext'
import { ViewType } from '../../types'
import fonts from 'styles/fonts'
import Button from 'components/button'
import useTranslation from 'hooks/useTranslation'

const MessageValidateAccount = () => {
  const { styles } = useResponsiveStyles(rStyles)
  const { setViewType, refForms } = useAuthContext()
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Typography
          color={colors.primary}
          content={t('messageValAcc')}
          disableThemeColor
          size={styles.title.fontSize}
          fontFamily={fonts.baloo2Bold700}
          style={{ alignSelf: 'center' }}
        />

        <Typography
          content={`${t('messageValClickLinkOne')} “${
            refForms.current[ViewType.createAccount]?.email
          }” ${t('messageValClickLinkThree')}`}
          disableThemeColor
          fontFamily={fonts.baloo2Medium500}
        />

        <Typography
          content={t('messageValIfNot')}
          color={colors.red}
          style={{ marginTop: 20 }}
          disableThemeColor
          fontFamily={fonts.baloo2Regular400}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            setViewType(ViewType.login)
          }}
          title={t('volver')}
          type={'secondaryBlue'}
          style={styles.button}
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

export default MessageValidateAccount
