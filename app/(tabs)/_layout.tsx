import { ColorSchema } from '@/src/common/ui/ColorSchema'
import { useLocalization } from '@/src/localization/useLocalization'
import { Tabs } from 'expo-router'
import * as React from 'react'
import { Image } from 'react-native'
import { ImageAssets } from '../../assets/img/ImageAsets'

export default function TabLayout() {
  const localize = useLocalization()
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: ColorSchema.onSecondary,
        headerShown: false
      }}>
      <Tabs.Screen
        name="options"
        options={{
          title: localize('options'),
          tabBarIcon: ({ color }) => (
            <Image
              source={ImageAssets.settings}
              style={{ height: 24, width: 24 }}
              tintColor={color}
            />
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: localize('measures'),
          tabBarIcon: ({ color }) => (
            <Image source={ImageAssets.home} style={{ height: 24, width: 24 }} tintColor={color} />
          )
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: localize('stats'),
          tabBarIcon: ({ color }) => (
            <Image source={ImageAssets.stats} style={{ height: 24, width: 24 }} tintColor={color} />
          )
        }}
      />
    </Tabs>
  )
}
