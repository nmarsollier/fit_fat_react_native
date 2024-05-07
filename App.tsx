/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './react/common/navigation/Navigation';
import { ColorSchema } from './react/common/ui/ColorSchema';
import MainScreen from './react/mainScreen/DatesList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={ColorSchema.lightBlueBackground}
      />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
