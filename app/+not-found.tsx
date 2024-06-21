import { Stack } from 'expo-router';
import * as React from 'react';
import { Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />

      <Text> Go to home screen!</Text>
    </>
  );
}
