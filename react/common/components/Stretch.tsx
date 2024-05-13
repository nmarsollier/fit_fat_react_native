import React from 'react';
import { View } from 'react-native';

export function Stretch() {
  return <View style={{ flex: 1, alignSelf: 'stretch' }} />;
}
