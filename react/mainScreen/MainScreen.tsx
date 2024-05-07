import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {ColorSchema} from '../common/ui/ColorSchema';
import {ImageAssets} from '../common/ui/ImageAsets';
import MeasuresScreen from '../measuresScreen/MeasuresScreen';
import PreferencesScreen from '../preferences/PreferencesScreen';
import StatsScreen from '../statsScreen/StatsScreen';
import {Image} from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: ColorSchema.primary,
        tabBarInactiveTintColor: ColorSchema.secondaryVariant,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Options': {
              iconName = ImageAssets.settings;
              break;
            }
            case 'Measures': {
              iconName = ImageAssets.home;
              break;
            }
            case 'Stats': {
              iconName = ImageAssets.stats;
              break;
            }
          }

          return (
            <Image
              source={iconName}
              style={{height: size, width: size}}
              tintColor={color}
            />
          );
        },
      })}>
      <Tab.Screen name="Options" component={PreferencesScreen} />
      <Tab.Screen name="Measures" component={MeasuresScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
    </Tab.Navigator>
  );
}
