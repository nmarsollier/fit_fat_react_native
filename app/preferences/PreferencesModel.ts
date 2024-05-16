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

export function measureMessageId(measureType: MeasureType | undefined) {
  switch (measureType) {
    case MeasureType.IMPERIAL:
      return 'unitLb';
    default:
      return 'unitKg';
  }
}

export function measureHeight(measureType: MeasureType) {
  switch (measureType) {
    case MeasureType.IMPERIAL:
      return 'unitIn';
    default:
      return 'unitCm';
  }
}

export function measureTypeMessageId(measureType: MeasureType) {
  switch (measureType) {
    case MeasureType.IMPERIAL:
      return 'optionsSystemOfMeasurementImperial';
    default:
      return 'optionsSystemOfMeasurementMetric';
  }
}

export function sexMessageId(sex: Sex) {
  switch (sex) {
    case Sex.FEMALE:
      return 'optionsSexFemale';
    default:
      return 'optionsSexMale';
  }
}
