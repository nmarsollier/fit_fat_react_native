import { initI18next } from '@/src/localization/librarySetup'
import { MainScreen } from '@/src/mainScreen/MainScreen'
import { Stack } from 'expo-router'
import * as React from 'react'

void initI18next()

export default function RootLayout() {
  return (
    <MainScreen>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </MainScreen>
  )
}
