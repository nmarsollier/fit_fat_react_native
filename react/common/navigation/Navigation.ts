import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  MainScreen: undefined;
};

export type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;
