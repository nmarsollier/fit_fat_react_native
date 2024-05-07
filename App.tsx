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
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { RootStackParamList } from './react/common/navigation/Navigation';
import { ColorSchema } from './react/common/ui/ColorSchema';
import { AppTheme } from './react/common/ui/Themes';
import MainScreen from './react/mainScreen/MainScreen';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { preferencesReducer } from './react/preferences/PreferencesState';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const sotore = configureStore({
  reducer: combineReducers({ preferencesReducer })
})

export default function App() {
  return (
    <Provider store={sotore} >
      <PaperProvider theme={AppTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar
            backgroundColor={ColorSchema.onSecondary}
          />

          <NavigationContainer>
            <MainScreen />
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
}
