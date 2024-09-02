import { IcBack } from '@/assets/svg'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { PropsWithChildren } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ColorSchema } from '../ui/ColorSchema'

export default function Toolbar({ children }: PropsWithChildren<object>) {
  const router = useRouter()

  return (
    <View
      style={{
        backgroundColor: ColorSchema.onSecondary,
        paddingStart: 16,
        paddingBottom: 5,
        alignItems: 'center',
        height: 40,
        flexDirection: 'row'
      }}>
      <StatusBar style="light" backgroundColor={ColorSchema.onSecondary} />

      {router.canGoBack() && (
        <TouchableOpacity
          onPress={() => {
            router.back()
          }}>
          <IcBack width={24} height={24} style={{ marginEnd: 10 }} color={ColorSchema.secondary} />
        </TouchableOpacity>
      )}
      {children}
    </View>
  )
}
