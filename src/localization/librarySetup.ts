import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { isDevelopment } from '@/src/common/libs/SystemTools'
import { StringResource } from '@/src/localization/translations'
import { StringResourceEn } from '@/src/localization/translations_en'
import { StringResourceEs } from '@/src/localization/translations_es'
import 'intl-pluralrules' // Do not remove this line

const resources = {
  en: {
    translation: recordToObject(StringResourceEn)
  },
  es: {
    translation: recordToObject(StringResourceEs)
  }
}

export async function initI18next() {
  if (i18next.isInitialized) return

  await i18next.use(initReactI18next).init(
    {
      resources,
      fallbackLng: 'en',
      debug: isDevelopment(),
      interpolation: {
        escapeValue: false
      },
      compatibilityJSON: 'v3'
    },
    () => {}
  )
}

function recordToObject(resource: Record<StringResource, string>): object {
  const result = {}
  Object.assign(result, resource)
  return result
}
