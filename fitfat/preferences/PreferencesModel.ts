import { StringResourceType } from '@/common/i18n/Internationalization'

export interface PreferencesData {
  id: string
  displayName: string
  birthDate: string
  weight: number
  height: number
  sex: Sex
  measureSystem: MeasureType
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum MeasureType {
  METRIC = 'METRIC',
  IMPERIAL = 'IMPERIAL'
}

export function measureWeightStringId(measureType?: MeasureType): StringResourceType {
  switch (measureType) {
    case MeasureType.IMPERIAL:
      return 'unitLb'
    default:
      return 'unitKg'
  }
}

export function measureHeightStringId(measureType: MeasureType): StringResourceType {
  switch (measureType) {
    case MeasureType.IMPERIAL:
      return 'unitIn'
    default:
      return 'unitCm'
  }
}

export function measureTypeStringId(measureType: MeasureType): StringResourceType {
  switch (measureType) {
    case MeasureType.IMPERIAL:
      return 'optionsSystemOfMeasurementImperial'
    default:
      return 'optionsSystemOfMeasurementMetric'
  }
}

export function sexStringId(sex: Sex): StringResourceType {
  switch (sex) {
    case Sex.FEMALE:
      return 'optionsSexFemale'
    default:
      return 'optionsSexMale'
  }
}
