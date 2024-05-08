/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {NativeModules} from 'react-native';

export function getLocale() {
  let locale = 'en';
  if (React.Platform.OS === 'android') {
    locale = NativeModules.I18nManager.localeIdentifier;
  } else {
    locale = NativeModules.RNI18n.locale.replace(/_/, '-');
  }

  if (locale.indexOf('_') > 0) {
    locale = locale.substring(0, locale.indexOf('_'));
  }
  if (locale.indexOf('-') > 0) {
    locale = locale.substring(0, locale.indexOf('-'));
  }
  return locale;
}
