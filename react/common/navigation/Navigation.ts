import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MainScreen: undefined;
  EditMeasureScreen: { measureId: string | undefined };
};

export type MainScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MainScreen'
>;

export type EditMeasureScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EditMeasureScreen'
>;
