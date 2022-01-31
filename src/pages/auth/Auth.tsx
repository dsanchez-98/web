import React, { FC } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
// import useOauth from 'services/oauth'
import Switch from './components/Switch'
import colors from 'styles/colors'
import { ScrollView } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import AuthContext from './AuthContext'
import useTranslation from 'hooks/useTranslation'
import Dropdown from 'components/dropdown'

const statusbar = getStatusBarHeight()

interface Props {}

const DropdownLanguage = () => {
  const { setLocale, locale } = useTranslation()

  const items = [
    { label: 'Español', value: 'es' },
    { label: 'Inglés', value: 'en' }
  ]

  return <Dropdown items={items} value={locale} onChange={setLocale} />
}

const Auth: FC<Props> = () => {
  return (
    <AuthContext>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Switch />
        </View>
      </ScrollView>
      {/* <View style={styles.dropDown}>
        <DropdownLanguage />
      </View> */}
    </AuthContext>
  )
}

export default Auth

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    justifyContent: 'center',
    flex: 1
  },
  dropDown: {
    position: 'absolute',
    left: 20,
    top: 30 + (Platform.OS !== 'web' ? statusbar : 0),
    width: 130
  }
})
