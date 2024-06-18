import EditMeasureScreen from '@/measures/edit/EditMeasureScreen';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

export default function Page() {
  var { measureId } = useLocalSearchParams();

  if (measureId?.length == 0) {
    measureId = undefined
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditMeasureScreen measureId={measureId?.toString()} />
    </>
  )
}