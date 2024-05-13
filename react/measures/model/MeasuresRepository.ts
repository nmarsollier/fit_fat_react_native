import AsyncStorage from '@react-native-async-storage/async-storage';
import { MeasuresData } from './MeassuresModel';

export async function storeMeasure(measure: MeasuresData) {
  try {
    const jsonValue = JSON.stringify(measure);
    await AsyncStorage.setItem(measure.uid, jsonValue);
  } catch (e) {
    console.log(e);
  }
}

export async function findMeasure(
  measureId: string,
): Promise<MeasuresData | undefined> {
  try {
    const jsonValue = await AsyncStorage.getItem(measureId);
    return jsonValue != null
      ? (JSON.parse(jsonValue) as MeasuresData)
      : undefined;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function findLastMeasure(): Promise<MeasuresData | undefined> {
  const measures = await findMeasures();
  if (measures.length > 0) {
    return measures[0];
  }
  return undefined;
}

export async function findMeasures(): Promise<MeasuresData[]> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const docs = await AsyncStorage.multiGet(
      keys.filter(key => key !== 'preferences'),
    );
    return docs
      .map(jsonValue => {
        return JSON.parse(jsonValue[1]!) as MeasuresData;
      })
      .sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        return 0;
      });
  } catch (e) {
    console.log(e);
    return [];
  }
}
