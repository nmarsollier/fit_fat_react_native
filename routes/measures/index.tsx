import EditMeasureScreen from '@/measures/edit/EditMeasureScreen';
import { Stack } from 'expo-router';
import * as React from 'react';

export default function Page() {
  return <>
    <Stack.Screen options={{ headerShown: false }} />
    <EditMeasureScreen measureId={undefined} />
  </>
}