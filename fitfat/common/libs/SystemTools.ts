/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { getLocales } from 'expo-localization'

export function currentLocale() {
  return getLocales()[0].languageCode ?? 'en'
}
