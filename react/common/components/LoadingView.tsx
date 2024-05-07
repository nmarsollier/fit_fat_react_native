import {ActivityIndicator, View} from 'react-native';
import {ColorSchema} from '../ui/ColorSchema';
import * as React from 'react';

export default function LoadingView() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorSchema.background,
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
