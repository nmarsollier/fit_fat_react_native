/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { EXPO_PUBLIC_APP_VARIANT } from '@env'

export function isDevelopment() {
  return EXPO_PUBLIC_APP_VARIANT === 'development'
}
