import { Stack, useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import EditMeasureScreen from '../../src/measures/edit/EditMeasureScreen'

export default function Page() {
  const { measureId } = useLocalSearchParams()

  let id: string | undefined = measureId?.toString()
  if (id?.length == 0) {
    id = undefined
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <EditMeasureScreen measureId={id} />
    </>
  )
}
