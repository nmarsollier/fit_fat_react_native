import { datetimeToString } from '../../common/libs/DateLibs';
import { uuid } from '../../common/libs/UUID';
import { Sex } from '../../preferences/PreferencesModel';
import { MeasureMethod } from './MeasureMethod';
import { Abdominal, Bicep, BodyFat, BodyWeight, Calf, Chest, LowerBack, MeasureValue, Midaxilarity, Subscapular, Suprailiac, Thigh, Triceps } from './MeasureValues';

export interface MeasuresData {
  id: string;
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
    id: uuid(),
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

export function currentMeasureValue({ measure, measureValue }: {
  measure: MeasuresData,
  measureValue: MeasureValue,
}) {
  switch (measureValue) {
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

export function setMeasureValue({ measure, measureValue, value: value }: {
  measure: MeasuresData,
  measureValue: MeasureValue,
  value: number,
}) {
  switch (measureValue) {
    case BodyWeight: {
      measure.bodyWeight = value;
      break;
    }
    case Chest: {
      measure.chest = value;
      break;
    }
    case Abdominal: {
      measure.abdominal = value;
      break;
    }
    case Thigh: {
      measure.thigh = value;
      break;
    }
    case Triceps: {
      measure.triceps = value;
      break;
    }
    case Subscapular: {
      measure.subscapular = value;
      break;
    }
    case Suprailiac: {
      measure.suprailiac = value;
      break;
    }
    case Midaxilarity: {
      measure.midaxillary = value;
      break;
    }
    case Bicep: {
      measure.bicep = value;
      break;
    }
    case LowerBack: {
      measure.lowerBack = value;
      break;
    }
    case Calf: {
      measure.calf = value;
      break;
    }
    case BodyFat: {
      measure.fatPercent = value;
      break;
    }
  }
  measure.fatPercent =
    Math.round(calculateFatPercent(measure) * 100) / 100;

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
