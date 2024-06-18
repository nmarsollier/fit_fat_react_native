import { ColorSchema } from '@/common/ui/ColorSchema';
import { ImageAssets } from '@/common/ui/ImageAsets';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { PropsWithChildren } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

export default function Toolbar({ children }: PropsWithChildren<object>) {
  const router = useRouter();

  return (
    <View
      style={{
        backgroundColor: ColorSchema.onSecondary,
        paddingStart: 16,
        paddingBottom: 5,
        alignItems: 'center',
        height: 40,
        flexDirection: 'row',
      }}
    >
      {router.canGoBack() && (
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}>
          <Image
            style={{ height: 24, width: 24, marginEnd: 10, marginBottom: 1 }}
            source={ImageAssets.back}
            tintColor={ColorSchema.secondary}
          />
        </TouchableOpacity>
      )}
      {children}
    </View>
  );
}
