import { ColorSchema } from '@/common/ui/ColorSchema';
import { ImageAssets } from '@/common/ui/ImageAsets';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { RowLayout } from './Layouts';

export default function Toolbar({ children }: PropsWithChildren<object>) {
  const navigation = useNavigation();

  return (
    <RowLayout
      style={{
        backgroundColor: ColorSchema.onSecondary,
        paddingStart: 16,
        paddingBottom: 5,
        alignItems: 'center',
        flexBasis: 35,
        flexShrink: 1,
        flexGrow: 0,
      }}>
      {navigation.canGoBack() && (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{ height: 24, width: 24, marginEnd: 10, marginBottom: 1 }}
            source={ImageAssets.back}
            tintColor={ColorSchema.secondary}
          />
        </TouchableOpacity>
      )}
      {children}
    </RowLayout>
  );
}
