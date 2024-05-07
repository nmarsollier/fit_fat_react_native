import {Text, View} from 'react-native';
import {ColorSchema} from '../ui/ColorSchema';
import * as React from 'react';

export default function ErrorView(props: {text: string}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ColorSchema.background,
        justifyContent: 'center',
      }}>
      <Text>{props.text}</Text>
    </View>
  );
}
