import { Stack } from 'expo-router';
import * as React from 'react';

import { MainScreen } from '../fitfat/mainScreen/MainScreen';

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
