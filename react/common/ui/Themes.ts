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
    surface: ColorSchema.background,
    surfaceDisabled: ColorSchema.background,
    onSurfaceVariant: ColorSchema.secondaryVariant,
    inverseSurface: ColorSchema.secondaryVariant,
    inverseOnSurface: ColorSchema.secondaryVariant,
    surfaceVariant: ColorSchema.background,
    onSurface: ColorSchema.primaryVariant,
  },
};

export const LabelTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    onSurface: ColorSchema.secondaryVariant,
  },
};

export const MenuTextTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    onSurface: ColorSchema.secondary,
  },
};
