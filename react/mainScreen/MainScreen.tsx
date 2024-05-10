import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {FormattedMessage} from 'react-intl';
import {Image} from 'react-native';
import {Text} from 'react-native-paper';
import {MainScreenProps} from '../common/navigation/Navigation';
import {ColorSchema} from '../common/ui/ColorSchema';
import {ImageAssets} from '../common/ui/ImageAsets';
import MeasuresListScreen from '../measures/list/MeasuresListScreen';
import PreferencesScreen from '../preferences/PreferencesScreen';
import StatsScreen from '../stats/StatsScreen';

const Tab = createBottomTabNavigator();

export default function MainScreen(props: MainScreenProps) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: ColorSchema.primary,
        tabBarInactiveTintColor: ColorSchema.secondaryVariant,
        tabBarLabel: ({focused}) => {
          let textColor = ColorSchema.secondaryVariant;
          if (focused) {
            textColor = ColorSchema.primary;
          }

          let textResource;

          switch (route.name) {
            case 'Options': {
              textResource = 'homeMenuOptions';
              break;
            }
            case 'Measures': {
              textResource = 'homeMeasureTitle';
              break;
            }
            case 'Stats': {
              textResource = 'homeMenuProgress';
              break;
            }
          }

          return (
            <Text
              variant="labelSmall"
              style={{
                color: textColor,
              }}>
              <FormattedMessage id={textResource} />
            </Text>
          );
        },
        tabBarIcon: ({color, size}) => {
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
      <Tab.Screen name="Measures" component={MeasuresListScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
    </Tab.Navigator>
  );
}
