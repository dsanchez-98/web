import { Context } from 'context/TranslationContext'
import I18n, { TranslateOptions } from 'i18n-js'
import { Scope } from 'localization/languages/types'
import { useContext } from 'react'

export const t = (scope: Scope, options?: TranslateOptions) => {
  return I18n.t(scope, options)
}

const useTranslation = () => {
  const context = useContext(Context)
  return context
}

export default useTranslation
