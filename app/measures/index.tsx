import { Stack } from 'expo-router'
import * as React from 'react'
import EditMeasureScreen from '../../src/measures/edit/EditMeasureScreen'

export default function Page() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditMeasureScreen measureId={undefined} />
    </>
  )
}
