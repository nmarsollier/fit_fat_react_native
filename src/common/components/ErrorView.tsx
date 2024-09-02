import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Text, View } from 'react-native'
import { ColorSchema } from '../ui/ColorSchema'

export default function ErrorView({ text }: { text: string }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorSchema.secondary,
        justifyContent: 'center'
      }}>
      <StatusBar style="light" backgroundColor={ColorSchema.onSecondary} />

      <Text>{text}</Text>
    </View>
  )
}
