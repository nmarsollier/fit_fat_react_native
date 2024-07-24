/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { DefaultTheme } from 'react-native-paper'
import { ColorSchema } from './ColorSchema'

export const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surface: ColorSchema.secondary,
    surfaceDisabled: ColorSchema.secondary,
    onSurfaceVariant: ColorSchema.surface,
    inverseSurface: ColorSchema.surface,
    inverseOnSurface: ColorSchema.surface,
    surfaceVariant: ColorSchema.secondary,
    onSurface: ColorSchema.primary
  }
}

export const LabelTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    onSurface: ColorSchema.surface
  }
}

export const MenuTextTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    onSurface: ColorSchema.onPrimary
  }
}
