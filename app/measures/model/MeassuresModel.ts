import { datetimeToString } from '../../common/libs/DateLibs';
import { uuid } from '../../common/libs/UUID';
import { Sex } from '../../preferences/PreferencesModel';

export interface MeasuresData {
  uid: string;
  date: string;
  bodyWeight: number;
  bodyHeight: number;
  age: number;
  sex: Sex;
  measureMethod: MeasureMethod;
  chest: number;
  abdominal: number;
  thigh: number;
  triceps: number;
  subscapular: number;
  suprailiac: number;
  midaxillary: number;
  bicep: number;
  lowerBack: number;
  calf: number;
  fatPercent: number;
}

export function newMeasuresData(): MeasuresData {
  return {
    uid: uuid(),
    date: datetimeToString(new Date()),
    bodyWeight: 0,
    bodyHeight: 0,
    age: 0,
    sex: Sex.MALE,
    measureMethod: MeasureMethod.FROM_SCALE,
    chest: 0,
    abdominal: 0,
    thigh: 0,
    triceps: 0,
    subscapular: 0,
    suprailiac: 0,
    midaxillary: 0,
    bicep: 0,
    lowerBack: 0,
    calf: 0,
    fatPercent: 0,
  };
}

export enum MeasureMethod {
  JACKSON_POLLOCK_7 = 'JACKSON_POLLOCK_7',
  JACKSON_POLLOCK_3 = 'JACKSON_POLLOCK_3',
  JACKSON_POLLOCK_4 = 'JACKSON_POLLOCK_4',
  PARRILLO = 'PARRILLO',
  DURNIN_WOMERSLEY = 'DURNIN_WOMERSLEY',
  FROM_SCALE = 'FROM_SCALE',
  WEIGHT_ONLY = 'WEIGHT_ONLY',
}

export function methodMessageId(method: MeasureMethod | undefined): string {
  switch (method) {
    case MeasureMethod.JACKSON_POLLOCK_7:
      return 'measureMethodJacksonPollock7';
    case MeasureMethod.JACKSON_POLLOCK_3:
      return 'measureMethodJacksonPollock3';
    case MeasureMethod.JACKSON_POLLOCK_4:
      return 'measureMethodJacksonPollock4';
    case MeasureMethod.PARRILLO:
      return 'measureMethodParrillo';
    case MeasureMethod.DURNIN_WOMERSLEY:
      return 'measureMethodDurninWomersley';
    case MeasureMethod.FROM_SCALE:
      return 'measureMethodManualScale';
    case MeasureMethod.WEIGHT_ONLY:
      return 'measureMethodWeight';
    default:
      return 'measureMethodWeight';
  }
}

export function isMeasureRequiredForMethod(
  value: MeasureValue,
  method: MeasureMethod,
): boolean {
  return value.requiredFor.some(e => e === method);
}

export enum InputType {
  INT = 'INT',
  DOUBLE = 'DOUBLE',
}

export enum UnitType {
  PERCENT = 'PERCENT',
  WEIGHT = 'WEIGHT',
  WIDTH = 'WIDTH',
}

export function unitTypeLabel(unitType: UnitType): string {
  switch (unitType) {
    case UnitType.PERCENT:
      return '%';
    case UnitType.WEIGHT:
      return 'kg';
    case UnitType.WIDTH:
      return 'mm';
  }
}

export function measureValueForMethod(
  measure: MeasuresData,
  value: MeasureValue,
) {
  switch (value) {
    case BodyWeight:
      return measure.bodyWeight;
    case Chest:
      return measure.chest;
    case Abdominal:
      return measure.abdominal;
    case Thigh:
      return measure.thigh;
    case Triceps:
      return measure.triceps;
    case Subscapular:
      return measure.subscapular;
    case Suprailiac:
      return measure.suprailiac;
    case Midaxilarity:
      return measure.midaxillary;
    case Bicep:
      return measure.bicep;
    case LowerBack:
      return measure.lowerBack;
    case Calf:
      return measure.calf;
    case BodyFat:
      return measure.fatPercent;
  }
}

// Available Measure Values
export interface MeasureValue {
  title: string;
  requiredFor: MeasureMethod[];
  maxScale: number;
  inputType: InputType;
  unitType: UnitType;
}

export const BodyWeight: MeasureValue = {
  title: 'measureWeight',
  requiredFor: [MeasureMethod.FROM_SCALE, MeasureMethod.WEIGHT_ONLY],
  maxScale: 149,
  inputType: InputType.DOUBLE,
  unitType: UnitType.WEIGHT,
};

export const Chest: MeasureValue = {
  title: 'measureChest',
  requiredFor: [
    MeasureMethod.JACKSON_POLLOCK_7,
    MeasureMethod.JACKSON_POLLOCK_3,
    MeasureMethod.PARRILLO,
  ],
  maxScale: 30,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH,
};

export const Abdominal: MeasureValue = {
  title: 'measureAbdominal',
  requiredFor: [
    MeasureMethod.JACKSON_POLLOCK_7,
    MeasureMethod.JACKSON_POLLOCK_3,
    MeasureMethod.JACKSON_POLLOCK_4,
    MeasureMethod.PARRILLO,
  ],
  maxScale: 40,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH,
};

export const Thigh: MeasureValue = {
  title: 'measureThigh',
  requiredFor: [
    MeasureMethod.JACKSON_POLLOCK_7,
    MeasureMethod.JACKSON_POLLOCK_3,
    MeasureMethod.JACKSON_POLLOCK_4,
    MeasureMethod.PARRILLO,
  ],
  maxScale: 40,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH,
};

export const Triceps: MeasureValue = {
  title: 'measureTricep',
  requiredFor: [
    MeasureMethod.JACKSON_POLLOCK_7,
    MeasureMethod.DURNIN_WOMERSLEY,
    MeasureMethod.JACKSON_POLLOCK_4,
    MeasureMethod.PARRILLO,
  ],
  maxScale: 30,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH,
};

export const Subscapular: MeasureValue = {
  title: 'measureSubscapular',
  requiredFor: [
    MeasureMethod.JACKSON_POLLOCK_7,
    MeasureMethod.DURNIN_WOMERSLEY,
    MeasureMethod.PARRILLO,
  ],
  maxScale: 40,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH,
};

export const Suprailiac: MeasureValue = {
  title: 'measureSuprailiac',
  requiredFor: [
    MeasureMethod.JACKSON_POLLOCK_7,
    MeasureMethod.DURNIN_WOMERSLEY,
    MeasureMethod.JACKSON_POLLOCK_4,
    MeasureMethod.PARRILLO,
  ],
  maxScale: 40,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH,
};

export const Midaxilarity: MeasureValue = {
  title: 'measureMidaxillary',
  requiredFor: [MeasureMethod.JACKSON_POLLOCK_7],
  maxScale: 40,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH,
};

export const Bicep: MeasureValue = {
  title: 'measureBicep',
  requiredFor: [MeasureMethod.DURNIN_WOMERSLEY, MeasureMethod.PARRILLO],
  maxScale: 30,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH,
};

export const LowerBack: MeasureValue = {
  title: 'measureLowerBack',
  requiredFor: [MeasureMethod.PARRILLO],
  maxScale: 40,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH,
};

export const Calf: MeasureValue = {
  title: 'measureCalf',
  requiredFor: [MeasureMethod.PARRILLO],
  maxScale: 30,
  inputType: InputType.INT,
  unitType: UnitType.WIDTH,
};

export const BodyFat: MeasureValue = {
  title: 'measureFat',
  requiredFor: [MeasureMethod.FROM_SCALE],
  maxScale: 49,
  inputType: InputType.DOUBLE,
  unitType: UnitType.PERCENT,
};

export const MeasureValues: MeasureValue[] = [
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
  BodyFat,
];

export function calculateFatPercent(measureData: MeasuresData): number {
  switch (measureData.measureMethod) {
    case MeasureMethod.JACKSON_POLLOCK_7: {
      const sum =
        measureData.chest +
        measureData.abdominal +
        measureData.thigh +
        measureData.triceps +
        measureData.subscapular +
        measureData.suprailiac +
        measureData.midaxillary;

      let density = 0;
      if (measureData.sex === Sex.MALE) {
        density =
          1.112 -
          0.00043499 * sum +
          0.00000055 * sum * sum -
          0.00028826 * measureData.age;
      } else {
        density =
          1.097 -
          0.00046971 * sum +
          0.00000056 * sum * sum -
          0.00012828 * measureData.age;
      }
      return 495 / density - 450;
    }

    case MeasureMethod.JACKSON_POLLOCK_3: {
      const sum = measureData.abdominal + measureData.thigh + measureData.chest;
      let density = 0;
      if (measureData.sex === Sex.MALE) {
        density =
          1.10938 -
          0.0008267 * sum +
          0.0000016 * sum * sum -
          0.0002574 * measureData.age;
      } else {
        density =
          1.0994291 -
          0.0009929 * sum +
          0.0000023 * sum * sum -
          0.0001392 * measureData.age;
      }
      return 495 / density - 450;
    }

    case MeasureMethod.JACKSON_POLLOCK_4: {
      const sum =
        measureData.abdominal +
        measureData.thigh +
        measureData.triceps +
        measureData.suprailiac;

      if (measureData.sex === Sex.MALE) {
        return (
          0.29288 * sum -
          0.0005 * sum * sum +
          0.15845 * measureData.age -
          5.76377
        );
      } else {
        return (
          0.29669 * sum -
          0.00043 * sum * sum +
          0.02963 * measureData.age -
          1.4072
        );
      }
    }
    case MeasureMethod.PARRILLO: {
      const sum =
        measureData.chest +
        measureData.abdominal +
        measureData.thigh +
        measureData.bicep +
        measureData.triceps +
        measureData.subscapular +
        measureData.suprailiac +
        measureData.lowerBack +
        measureData.calf;
      return ((27 * sum) / measureData.bodyWeight) * 2.20462;
    }
    case MeasureMethod.DURNIN_WOMERSLEY: {
      const logSum = Math.log10(
        measureData.bicep +
          measureData.triceps +
          measureData.subscapular +
          measureData.suprailiac,
      );

      let density = 0;
      if (measureData.sex === Sex.MALE) {
        if (measureData.age <= 16) {
          density = 1.1533 - 0.0643 * logSum;
        } else if (measureData.age <= 19) {
          density = 1.162 - 0.063 * logSum;
        } else if (measureData.age <= 29) {
          density = 1.1631 - 0.0632 * logSum;
        } else if (measureData.age <= 39) {
          density = 1.1422 - 0.0544 * logSum;
        } else if (measureData.age <= 49) {
          density = 1.162 - 0.07 * logSum;
        } else {
          density = 1.1715 - 0.0779 * logSum;
        }
      } else {
        if (measureData.age <= 17) {
          density = 1.1369 - 0.0598 * logSum;
        } else if (measureData.age <= 19) {
          density = 1.1549 - 0.0678 * logSum;
        } else if (measureData.age <= 29) {
          density = 1.1599 - 0.0717 * logSum;
        } else if (measureData.age <= 39) {
          density = 1.1423 - 0.0632 * logSum;
        } else if (measureData.age <= 49) {
          density = 1.1333 - 0.0612 * logSum;
        } else {
          density = 1.1339 - 0.0645 * logSum;
        }
      }

      return 495 / density - 450;
    }
    case MeasureMethod.FROM_SCALE: {
      return measureData.fatPercent;
    }
    case MeasureMethod.WEIGHT_ONLY: {
      return 0;
    }
  }
}

export function bodyFatMass(measure: MeasuresData): number {
  if (measure.bodyWeight > 0 && measure.fatPercent > 0) {
    return measure.bodyWeight * (measure.fatPercent / 100);
  } else {
    return 0.0;
  }
}

function leanWeight(measure: MeasuresData): number {
  if (measure.bodyWeight > 0 && measure.fatPercent > 0) {
    return measure.bodyWeight * (1 - measure.fatPercent / 100);
  } else {
    return 0.0;
  }
}

export function freeFatMassIndex(measure: MeasuresData): number {
  const lw = leanWeight(measure);
  const bh = measure.bodyHeight;
  if (lw > 0 && bh > 0) {
    return lw / ((bh / 100) * (bh / 100));
  } else {
    return 0.0;
  }
}
