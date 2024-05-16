import AsyncStorage from '@react-native-async-storage/async-storage';
import { PreferencesData } from './PreferencesModel';

export async function storePreferences(preferences: PreferencesData) {
  try {
    const jsonValue = JSON.stringify(preferences);
    await AsyncStorage.setItem('preferences', jsonValue);
  } catch (e) {
    console.log(e);
  }
}

export async function findPreferences(): Promise<PreferencesData | undefined> {
  try {
    const jsonValue = await AsyncStorage.getItem('preferences');
    return jsonValue != null
      ? (JSON.parse(jsonValue) as PreferencesData)
      : undefined;
  } catch (e) {
    console.log(e);
  }
}
