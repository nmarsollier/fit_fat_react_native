/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { DefaultTheme } from 'react-native-paper';
import { ColorSchema } from './ColorSchema';

export const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surface: ColorSchema.secondary,
    surfaceDisabled: ColorSchema.secondary,
    onSurfaceVariant: ColorSchema.primary,
    inverseSurface: ColorSchema.primary,
    inverseOnSurface: ColorSchema.primary,
    surfaceVariant: ColorSchema.secondary,
    onSurface: ColorSchema.primaryVariant,
  }
};

export const LabelTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    onSurface: ColorSchema.primary,
  },
};

export const MenuTextTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    onSurface: ColorSchema.onPrimary,
  },
};
