import { getLocales } from 'expo-localization'
import { TOptions } from 'i18next'
import { useTranslation } from 'react-i18next'
import { StringResource } from './translations'

export function useLocalization() {
  const currentLocale = getLocales()[0].languageCode || 'en'

  const { t } = useTranslation(undefined, { lng: currentLocale })

  const localize = (resource: StringResource, options?: TOptions) => {
    return t(resource, options)
  }

  return localize
}
