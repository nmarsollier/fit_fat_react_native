import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import EditMeasureScreen from '../../fitfat/measures/edit/EditMeasureScreen';

export default function Page() {
  let { measureId } = useLocalSearchParams();

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