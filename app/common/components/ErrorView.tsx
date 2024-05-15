import * as React from 'react';
import { Text, View } from 'react-native';
import { ColorSchema } from '../ui/ColorSchema';

export default function ErrorView(props: { text: string }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorSchema.secondary,
        justifyContent: 'center',
      }}>
      <Text>{props.text}</Text>
    </View>
  );
}
