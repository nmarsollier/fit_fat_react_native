declare module '@env' {
  export const EXPO_PUBLIC_APP_VARIANT: string
}

declare module '*.svg' {
  import React from 'react'

  import { SvgProps } from 'react-native-svg'

  const content: React.FC<SvgProps>
  export default content
}
