
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { IntlProvider } from 'react-intl';
import React, {
  StatusBar,
  View
} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { getLocale } from './react/common/libs/SystemTools';
import { RootStackParamList } from './react/common/navigation/Navigation';
import { ColorSchema } from './react/common/ui/ColorSchema';
import { messages } from './react/common/ui/Internationalization';
import { AppTheme } from './react/common/ui/Themes';
import MainScreen from './react/mainScreen/MainScreen';
import EditMeasureScreen from './react/measures/edit/EditMeasureScreen';
import { preferencesReducer, PreferencesState } from './react/preferences/PreferencesState';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const sotore = configureStore({
  reducer: combineReducers({ preferencesReducer })
})

export interface CombinedReducerState {
  preferencesReducer: PreferencesState
}

function AppContent() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: ColorSchema.onSecondary, paddingTop: insets.top }}>
      <StatusBar
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

export default function App() {
  const locale = getLocale()

  return (
    <SafeAreaProvider >
      <IntlProvider locale={locale} messages={messages.get(locale)} defaultLocale='en' >
        <PaperProvider theme={AppTheme}>
          <Provider store={sotore} >
            <AppContent />
          </Provider>
        </PaperProvider>
      </IntlProvider>
    </SafeAreaProvider>
  );
}
