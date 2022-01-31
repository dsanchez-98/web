import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import storage from 'redux-core/store/storage'
import en from './languages/en'
import es from './languages/es'

const translations = { en, es }
const defaultLocale = Localization.locale.split('-')[0]
i18n.fallbacks = true
i18n.translations = translations

export const initTranslations = async () => {
  const locale = await storage.getItem('locale')
  if (!locale) {
    storage.setItem('locale', defaultLocale)
    i18n.locale = defaultLocale
  } else {
    i18n.locale = locale
  }
}

initTranslations()
