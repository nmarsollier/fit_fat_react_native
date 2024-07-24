import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'
import { useEffect } from 'react'

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { StatusBar } from 'expo-status-bar'
import { useMemo } from 'react'
import { IntlProvider } from 'react-intl'
import { View } from 'react-native'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { messages } from '../common/i18n/Internationalization'
import { currentLocale } from '../common/libs/SystemTools'
import { ColorSchema } from '../common/ui/ColorSchema'
import { AppTheme } from '../common/ui/Themes'
import { initializeMeasuresDatabase } from '../measures/model/MeasuresRepository'
import { preferencesReducer, PreferencesState } from '../preferences/PreferencesState'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const appStore = configureStore({
  reducer: combineReducers({ preferencesReducer })
})

export interface CombinedReducerState {
  preferencesReducer: PreferencesState
}

export function MainScreen({ children }: React.PropsWithChildren) {
  const locale = useMemo(() => currentLocale(), [])

  initializeMeasuresDatabase().then()

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <SafeAreaProvider>
      <IntlProvider locale={locale} messages={messages.get(locale)} defaultLocale="en">
        <PaperProvider theme={AppTheme}>
          <Provider store={appStore}>
            <MainScreenContent>{children}</MainScreenContent>
          </Provider>
        </PaperProvider>
      </IntlProvider>
    </SafeAreaProvider>
  )
}

function MainScreenContent({ children }: React.PropsWithChildren) {
  const insets = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorSchema.onSecondary,
        paddingTop: insets.top
      }}>
      <StatusBar style="light" backgroundColor={ColorSchema.onSecondary} />

      {children}
    </View>
  )
}
