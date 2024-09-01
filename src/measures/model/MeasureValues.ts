import { StringResourceType } from '@/common/i18n/Internationalization'
import { MeasureMethod } from './MeasureMethod'

export enum InputType {
  INT = 'INT',
  DOUBLE = 'DOUBLE'
}

export enum UnitType {
  PERCENT = 'PERCENT',
  WEIGHT = 'WEIGHT',
  WIDTH = 'WIDTH'
}

export function unitTypeStringId(unitType: UnitType): StringResourceType {
  switch (unitType) {
    case UnitType.PERCENT:
      return 'unitPercent'
    case UnitType.WEIGHT:
      return 'unitKg'
    case UnitType.WIDTH:
      return 'unitMm'
  }
}

// Available Measure Values
export interface MeasureValue {
  title: StringResourceType
  requiredFor: MeasureMethod[]
  maxScale: number
  inputType: InputType
  unitType: UnitType
}

export const BodyWeight: MeasureValue = {
  title: 'measureWeight',
  requiredFor: [MeasureMethod.FROM_SCALE, MeasureMethod.WEIGHT_ONLY],
  maxScale: 149,
  inputType: InputType.DOUBLE,
  unitType: UnitType.WEIGHT
}

export const Chest: MeasureValue = {
  title: 'measureChest',
  requiredFor: [
    MeasureMethod.JACKSON_POLLOCK_7,
    MeasureMethod.JACKSON_POLLOCK_3,
    MeasureMethod.PARRILLO
  ],
  maxScale: 30,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH
}

export const Abdominal: MeasureValue = {
  title: 'measureAbdominal',
  requiredFor: [
    MeasureMethod.JACKSON_POLLOCK_7,
    MeasureMethod.JACKSON_POLLOCK_3,
    MeasureMethod.JACKSON_POLLOCK_4,
    MeasureMethod.PARRILLO
  ],
  maxScale: 40,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH
}

export const Thigh: MeasureValue = {
  title: 'measureThigh',
  requiredFor: [
    MeasureMethod.JACKSON_POLLOCK_7,
    MeasureMethod.JACKSON_POLLOCK_3,
    MeasureMethod.JACKSON_POLLOCK_4,
    MeasureMethod.PARRILLO
  ],
  maxScale: 40,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH
}

export const Triceps: MeasureValue = {
  title: 'measureTricep',
  requiredFor: [
    MeasureMethod.JACKSON_POLLOCK_7,
    MeasureMethod.DURNIN_WOMERSLEY,
    MeasureMethod.JACKSON_POLLOCK_4,
    MeasureMethod.PARRILLO
  ],
  maxScale: 30,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH
}

export const Subscapular: MeasureValue = {
  title: 'measureSubscapular',
  requiredFor: [
    MeasureMethod.JACKSON_POLLOCK_7,
    MeasureMethod.DURNIN_WOMERSLEY,
    MeasureMethod.PARRILLO
  ],
  maxScale: 40,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH
}

export const Suprailiac: MeasureValue = {
  title: 'measureSuprailiac',
  requiredFor: [
    MeasureMethod.JACKSON_POLLOCK_7,
    MeasureMethod.DURNIN_WOMERSLEY,
    MeasureMethod.JACKSON_POLLOCK_4,
    MeasureMethod.PARRILLO
  ],
  maxScale: 40,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH
}

export const Midaxilarity: MeasureValue = {
  title: 'measureMidaxillary',
  requiredFor: [MeasureMethod.JACKSON_POLLOCK_7],
  maxScale: 40,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH
}

export const Bicep: MeasureValue = {
  title: 'measureBicep',
  requiredFor: [MeasureMethod.DURNIN_WOMERSLEY, MeasureMethod.PARRILLO],
  maxScale: 30,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH
}

export const LowerBack: MeasureValue = {
  title: 'measureLowerBack',
  requiredFor: [MeasureMethod.PARRILLO],
  maxScale: 40,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH
}

export const Calf: MeasureValue = {
  title: 'measureCalf',
  requiredFor: [MeasureMethod.PARRILLO],
  maxScale: 30,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH
}

export const BodyFat: MeasureValue = {
  title: 'measureFat',
  requiredFor: [MeasureMethod.FROM_SCALE],
  maxScale: 49,
  inputType: InputType.DOUBLE,
  unitType: UnitType.PERCENT
}

const MeasureValues: MeasureValue[] = [
  BodyWeight,
  Chest,
  Abdominal,
  Thigh,
  Triceps,
  Subscapular,
  Suprailiac,
  Midaxilarity,
  Bicep,
  LowerBack,
  Calf,
  BodyFat
]

export function getMeasureValuesForMethod(method: Readonly<MeasureMethod>): MeasureValue[] {
  return MeasureValues.filter((value) => value.requiredFor.some((e) => e === method))
}
