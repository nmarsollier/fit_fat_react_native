import { ColorSchema } from '@/common/ui/ColorSchema';
import * as React from 'react';
import { Text, View } from 'react-native';

export default function StatsScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorSchema.secondary,
        justifyContent: 'center',
      }}>
      <Text>Stats</Text>
    </View>
  );
}
