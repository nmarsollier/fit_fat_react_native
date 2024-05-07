
export interface PreferencesData {
  uid: string;
  displayName: string;
  birthDate: string;
  weight: number;
  height: number;
  sex: Sex;
  measureSystem: MeasureType;
}

export enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum MeasureType {
  METRIC = "METRIC",
  IMPERIAL = "IMPERIAL",
}

export function measureWeight(measureType: MeasureType) {
  switch (measureType) {
    case MeasureType.IMPERIAL:
      return 'lb';
    default:
      return 'kg';
  }
}

export function measureHeight(measureType: MeasureType) {
  switch (measureType) {
    case MeasureType.IMPERIAL:
      return 'in';
    default:
      return 'cm';
  }
}

export function measureTypeName(measureType: MeasureType) {
  switch (measureType) {
    case MeasureType.IMPERIAL:
      return 'Imperial';
    default:
      return 'Metric';
  }
}

export function sexName(sex: Sex) {
  switch (sex) {
    case Sex.FEMALE:
      return 'Female';
    default:
      return 'Male';
  }
}
