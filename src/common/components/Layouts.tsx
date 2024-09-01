import React, { PropsWithChildren } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

export function ColumnLayout({
  style,
  children
}: PropsWithChildren<{
  style?: StyleProp<ViewStyle>
}>) {
  return (
    <View
      style={[
        style,
        {
          flex: 1,
          flexDirection: 'column'
        }
      ]}>
      {children}
    </View>
  )
}

export function RowLayout({
  style,
  children
}: PropsWithChildren<{
  style?: StyleProp<ViewStyle>
}>) {
  return (
    <View
      style={[
        style,
        {
          flex: 1,
          flexDirection: 'row'
        }
      ]}>
      {children}
    </View>
  )
}
