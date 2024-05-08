import {ColorSchema} from '../common/ui/ColorSchema';
import {Text, View} from 'react-native';
import * as React from 'react';

export default function StatsScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorSchema.background,
        justifyContent: 'center',
      }}>
      <Text>Stats</Text>
    </View>
  );
}
