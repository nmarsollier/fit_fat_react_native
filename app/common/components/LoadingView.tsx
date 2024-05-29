import { ColorSchema } from '@/common/ui/ColorSchema';
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { ColumnLayout } from './Layouts';
import { Stretch } from './Stretch';

export default function LoadingView() {
  return (
    <ColumnLayout
      style={{
        backgroundColor: ColorSchema.secondary,
      }}>
      <ActivityIndicator size="large" style={{ flex: 1 }} />

      <Stretch />
    </ColumnLayout>
  );
}
