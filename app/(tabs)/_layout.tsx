import { Tabs } from 'expo-router';
import * as React from 'react';
import { Image } from 'react-native';
import { ColorSchema } from '../../fitfat/common/ui/ColorSchema';
import { ImageAssets } from '../../fitfat/common/ui/ImageAsets';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName='index'
      screenOptions={{
        tabBarActiveTintColor: ColorSchema.onSecondary,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="options"
        options={{
          title: 'Options',
          tabBarIcon: ({ color }) => (
            <Image
              source={ImageAssets.settings}
              style={{ height: 24, width: 24 }}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Measures',
          tabBarIcon: ({ color }) => (
            <Image
              source={ImageAssets.home}
              style={{ height: 24, width: 24 }}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => (
            <Image
              source={ImageAssets.stats}
              style={{ height: 24, width: 24 }}
              tintColor={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
