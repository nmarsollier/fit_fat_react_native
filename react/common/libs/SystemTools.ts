/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as RNLocalize from 'react-native-localize';

export function getLocale() {
  return RNLocalize.getLocales()[0].languageCode;
}
