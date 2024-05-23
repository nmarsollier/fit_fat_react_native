export interface PreferencesData {
  id: string;
  displayName: string;
  birthDate: string;
  weight: number;
  height: number;
  sex: Sex;
  measureSystem: MeasureType;
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum MeasureType {
  METRIC = 'METRIC',
  IMPERIAL = 'IMPERIAL',
}

export function measureWeightStringId(measureType?: MeasureType) {
  switch (measureType) {
    case MeasureType.IMPERIAL:
      return 'unitLb';
    default:
      return 'unitKg';
  }
}

export function measureHeightStringId(measureType: MeasureType) {
  switch (measureType) {
    case MeasureType.IMPERIAL:
      return 'unitIn';
    default:
      return 'unitCm';
  }
}

export function measureTypeStringId(measureType: MeasureType) {
  switch (measureType) {
    case MeasureType.IMPERIAL:
      return 'optionsSystemOfMeasurementImperial';
    default:
      return 'optionsSystemOfMeasurementMetric';
  }
}

export function sexStringId(sex: Sex) {
  switch (sex) {
    case Sex.FEMALE:
      return 'optionsSexFemale';
    default:
      return 'optionsSexMale';
  }
}
