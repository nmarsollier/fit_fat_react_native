
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { StatusBar } from 'expo-status-bar';
import { IntlProvider } from 'react-intl';
import React, {
  View
} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { getLocale } from './common/libs/SystemTools';
import { RootStackParamList } from './common/navigation/Navigation';
import { ColorSchema } from './common/ui/ColorSchema';
import { messages } from './common/ui/Internationalization';
import { AppTheme } from './common/ui/Themes';
import MainScreen from './mainScreen/MainScreen';
import EditMeasureScreen from './measures/edit/EditMeasureScreen';
import { preferencesReducer, PreferencesState } from './preferences/PreferencesState';
import { useMemo } from 'react';

const Stack = createNativeStackNavigator<RootStackParamList>();

const appStore = configureStore({
  reducer: combineReducers({ preferencesReducer })
})

export interface CombinedReducerState {
  preferencesReducer: PreferencesState
}

export default function App() {
  const locale = useMemo(() => getLocale(), [])

  return (
    <SafeAreaProvider >
      <IntlProvider locale={locale} messages={messages.get(locale)} defaultLocale='en' >
        <PaperProvider theme={AppTheme}>
          <Provider store={appStore} >
            <AppContent />
          </Provider>
        </PaperProvider>
      </IntlProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{
      flex: 1,
      backgroundColor: ColorSchema.onSecondary,
      paddingTop: insets.top
    }}>
      <StatusBar
        style='light'
        backgroundColor={ColorSchema.onSecondary}
      />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="EditMeasureScreen"
            component={EditMeasureScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}
