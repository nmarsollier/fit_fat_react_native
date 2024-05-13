import { useEffect, useState } from 'react';
import { useOnStateEvent } from '../../common/components/OnStateEvent';
import { datetimeToString } from '../../common/libs/DateLibs';
import { uuid } from '../../common/libs/UUID';
import {
  Abdominal,
  Bicep,
  BodyFat,
  BodyWeight,
  calculateFatPercent,
  Calf,
  Chest,
  isMeasureRequiredForMethod,
  LowerBack,
  MeasureMethod,
  MeasuresData,
  MeasureValue,
  measureValueForMethod,
  MeasureValues,
  Midaxilarity,
  newMeasuresData,
  Subscapular,
  Suprailiac,
  Thigh,
  Triceps,
} from '../model/MeassuresModel';
import {
  findLastMeasure,
  findMeasure,
  storeMeasure,
} from '../model/MeasuresRepository';

export interface EditMeasureState {
  isNew: boolean;
  isError: boolean;
  isLoading: boolean;
  measure: MeasuresData;
  measureValues: MeasureValueData[];
}

export const GoBack = {};

export interface MeasureValueData {
  measureValue: MeasureValue;
  value: number;
  intValue: number;
  decimalValue: number;
}

export interface EditMeasureReducer {
  save: () => void;
  updateMeasureDate: (date: string) => void;
  updateMeasureMethod: (method: MeasureMethod) => void;
  setMeasureValueForMethod: (measureValue: MeasureValue, value: number) => void;
}

export function useEditMeasureState(measureIdParam: string | undefined) {
  const [state, setState] = useState<EditMeasureState>({
    isNew: true,
    isError: false,
    isLoading: true,
    measure: newMeasuresData(),
    measureValues: [],
  });

  const [onEvent, emitEvent] = useOnStateEvent();

  const save = async () => {
    setState(s => {
      return {
        ...s,
        isLoading: true,
      };
    });

    setState(s => {
      storeMeasure(s.measure)
        .then(() => {
          emitEvent(GoBack);
        })
        .catch(e => {
          console.log(e);
        });

      return s;
    });
  };

  const initialize = async () => {
    let measure = newMeasuresData();

    setState({
      isNew: measureIdParam === undefined,
      isError: false,
      isLoading: true,
      measure,
      measureValues: [],
    });

    let last: MeasuresData | undefined;
    if (measureIdParam) {
      last = await findMeasure(measureIdParam);
    } else {
      last = await findLastMeasure();
    }

    if (last) {
      measure = {
        ...last,
        uid: uuid(),
        date: datetimeToString(new Date()),
      };
    }

    setState({
      isNew: measureIdParam === undefined,
      isError: false,
      isLoading: false,
      measure,
      measureValues: fillValues(measure, measureValues(measure.measureMethod)),
    });
  };

  const updateMeasureMethod = (method: MeasureMethod) => {
    setState(s => {
      const newState = {
        ...s,
      };

      newState.measure.measureMethod = method;
      newState.measureValues = fillValues(
        s.measure,
        measureValues(s.measure.measureMethod),
      );

      return newState;
    });
  };

  const updateMeasureDate = (date: string) => {
    setState(s => {
      const newState = {
        ...s,
      };

      newState.measure.date = date;

      return newState;
    });
  };

  const setMeasureValueForMethod = (
    measureValue: MeasureValue,
    value: number,
  ) => {
    setState(s => {
      let newValue = measureValueForMethod(s.measure, measureValue) || 0;
      const currentValue = newValue;

      const intPart = Math.trunc(value);
      const decimalPart = value % 1;
      if (intPart > 0) {
        newValue = value + (newValue % 1);
      } else if (decimalPart > 0) {
        newValue = Math.trunc(newValue) + decimalPart;
      }
      if (newValue === currentValue) {
        return s;
      }

      const newState = {
        ...s,
      };

      switch (measureValue) {
        case BodyWeight: {
          newState.measure.bodyWeight = newValue;
          break;
        }
        case Chest: {
          newState.measure.chest = newValue;
          break;
        }
        case Abdominal: {
          newState.measure.abdominal = newValue;
          break;
        }
        case Thigh: {
          newState.measure.thigh = newValue;
          break;
        }
        case Triceps: {
          newState.measure.triceps = newValue;
          break;
        }
        case Subscapular: {
          newState.measure.subscapular = newValue;
          break;
        }
        case Suprailiac: {
          newState.measure.suprailiac = newValue;
          break;
        }
        case Midaxilarity: {
          newState.measure.midaxillary = newValue;
          break;
        }
        case Bicep: {
          newState.measure.bicep = newValue;
          break;
        }
        case LowerBack: {
          newState.measure.lowerBack = newValue;
          break;
        }
        case Calf: {
          newState.measure.calf = newValue;
          break;
        }
        case BodyFat: {
          newState.measure.fatPercent = newValue;
          break;
        }
      }
      newState.measure.fatPercent =
        Math.round(calculateFatPercent(newState.measure) * 100) / 100;

      newState.measureValues = fillValues(
        newState.measure,
        measureValues(newState.measure.measureMethod),
      );
      return newState;
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  const reducer: EditMeasureReducer = {
    updateMeasureMethod,
    updateMeasureDate,
    setMeasureValueForMethod,
    save,
  };

  return { state, onEvent, reducer };
}

function measureValues(method: MeasureMethod): MeasureValue[] {
  return MeasureValues.filter(v => isMeasureRequiredForMethod(v, method));
}

function fillValues(
  measure: MeasuresData,
  measuresValues: MeasureValue[],
): MeasureValueData[] {
  return measuresValues.map((measureValue, index) => {
    const value = measureValueForMethod(measure, measureValue) || 0;
    return {
      measureValue,
      value,
      intValue: Math.trunc(value),
      decimalValue: value % 1,
    };
  });
}
