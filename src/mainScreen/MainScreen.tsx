import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'
import { useEffect } from 'react'

import { preferencesStore } from '@/src/preferences/PreferencesStore'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ColorSchema as ColorScheme } from '../common/ui/ColorSchema'
import { AppTheme } from '../common/ui/Themes'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export function MainScreen({ children }: React.PropsWithChildren) {
  const { reducer } = preferencesStore((state) => state)

  useEffect(() => {
    void reducer.loadPreferences()
  }, [])

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider theme={AppTheme}>
          <MainScreenContent>{children}</MainScreenContent>
        </PaperProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

function MainScreenContent({ children }: React.PropsWithChildren) {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorScheme.onSecondary,
        paddingTop: insets.top
      }}>
      {children}
    </View>
  )
}
