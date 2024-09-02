import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { ColorSchema } from '../ui/ColorSchema'
import { ColumnLayout } from './Layouts'
import { Stretch } from './Stretch'

export default function LoadingView() {
  return (
    <ColumnLayout
      style={{
        backgroundColor: ColorSchema.secondary
      }}>
      <StatusBar style="light" backgroundColor={ColorSchema.onSecondary} />

      <ActivityIndicator size="large" style={{ flex: 1 }} />

      <Stretch />
    </ColumnLayout>
  )
}
