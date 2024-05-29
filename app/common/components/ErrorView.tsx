import { ColorSchema } from '@/common/ui/ColorSchema';
import * as React from 'react';
import { Text, View } from 'react-native';

export default function ErrorView({ text }: { text: string }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorSchema.secondary,
        justifyContent: 'center',
      }}>
      <Text>{text}</Text>
    </View>
  );
}
