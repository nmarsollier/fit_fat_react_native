import { IcHome, IcSettings, IcStats } from '@/assets/svg'
import { ColorSchema } from '@/src/common/ui/ColorSchema'
import { useLocalization } from '@/src/localization/useLocalization'
import { Tabs } from 'expo-router'
import * as React from 'react'

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
          tabBarIcon: ({ color }) => <IcSettings width={28} height={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: localize('measures'),
          tabBarIcon: ({ color }) => <IcHome width={28} height={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: localize('stats'),
          tabBarIcon: ({ color }) => <IcStats width={28} height={28} color={color} />
        }}
      />
    </Tabs>
  )
}
