import React, { createContext, FC, useState } from 'react'
import i18n, { TranslateOptions } from 'i18n-js'
import { Scope } from 'localization/languages/types'
import storage from 'redux-core/store/storage'

const initialValues = {
  setLocale: (locale: string) => {},
  t: (scope: Scope, options?: TranslateOptions) => '',
  locale: ''
}

export const Context = createContext(initialValues)

export const AppContext: FC<{}> = (props) => {
  const [locale, setLocale] = useState<string>(i18n.locale)

  const _setLocale = async (locale: string) => {
    i18n.locale = locale
    await storage.setItem('locale', locale)
    setLocale(locale)
  }

  return (
    <Context.Provider value={{ setLocale: _setLocale, t: i18n.t, locale }}>
      {props.children}
    </Context.Provider>
  )
}

export default AppContext
