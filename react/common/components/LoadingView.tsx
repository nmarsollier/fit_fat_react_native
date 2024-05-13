import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { ColorSchema } from '../ui/ColorSchema';
import { ColumnLayout } from './Layouts';
import { Stretch } from './Stretch';

export default function LoadingView() {
  return (
    <ColumnLayout
      style={{
        backgroundColor: ColorSchema.background,
      }}>
      <ActivityIndicator size="large" style={{ flex: 1 }} />

      <Stretch />
    </ColumnLayout>
  );
}
