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
  currentValueForMeasure,
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
  updateMeasureValueForMethod: (measureValue: MeasureValue, value: number) => void;
}

export function useEditMeasureState(measureId: string | undefined) {
  const [state, setState] = useState<EditMeasureState>({
    isNew: true,
    isError: false,
    isLoading: true,
    measure: newMeasuresData(),
    measureValues: [],
  });

  const [onEvent, emitEvent] = useOnStateEvent();

  const save = () => {
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
      isNew: measureId === undefined,
      isError: false,
      isLoading: true,
      measure,
      measureValues: [],
    });

    let last: MeasuresData | undefined;
    if (measureId) {
      last = await findMeasure(measureId);
    } else {
      last = await findLastMeasure();
    }

    if (last) {
      measure = {
        ...last,
        id: uuid(),
        date: datetimeToString(new Date()),
      };
    }

    setState({
      isNew: measureId === undefined,
      isError: false,
      isLoading: false,
      measure,
      measureValues: fillValues(measure, getMeasureValuesForMethod(measure.measureMethod)),
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
        getMeasureValuesForMethod(s.measure.measureMethod),
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

  const updateMeasureValueForMethod = (
    measureValue: MeasureValue,
    newValue: number,
  ) => {
    setState(s => {
      let assignValue = currentValueForMeasure({ measure: s.measure, value: measureValue }) || 0;
      const currentValue = assignValue;

      const intPart = Math.trunc(newValue);
      const decimalPart = newValue % 1;
      if (intPart > 0) {
        assignValue = newValue + (assignValue % 1);
      } else if (decimalPart > 0) {
        assignValue = Math.trunc(assignValue) + decimalPart;
      }
      if (assignValue === currentValue) {
        return s;
      }

      const newState = {
        ...s,
      };

      switch (measureValue) {
        case BodyWeight: {
          newState.measure.bodyWeight = assignValue;
          break;
        }
        case Chest: {
          newState.measure.chest = assignValue;
          break;
        }
        case Abdominal: {
          newState.measure.abdominal = assignValue;
          break;
        }
        case Thigh: {
          newState.measure.thigh = assignValue;
          break;
        }
        case Triceps: {
          newState.measure.triceps = assignValue;
          break;
        }
        case Subscapular: {
          newState.measure.subscapular = assignValue;
          break;
        }
        case Suprailiac: {
          newState.measure.suprailiac = assignValue;
          break;
        }
        case Midaxilarity: {
          newState.measure.midaxillary = assignValue;
          break;
        }
        case Bicep: {
          newState.measure.bicep = assignValue;
          break;
        }
        case LowerBack: {
          newState.measure.lowerBack = assignValue;
          break;
        }
        case Calf: {
          newState.measure.calf = assignValue;
          break;
        }
        case BodyFat: {
          newState.measure.fatPercent = assignValue;
          break;
        }
      }
      newState.measure.fatPercent =
        Math.round(calculateFatPercent(newState.measure) * 100) / 100;

      newState.measureValues = fillValues(
        newState.measure,
        getMeasureValuesForMethod(newState.measure.measureMethod),
      );
      return newState;
    });
  };

  useEffect(() => {
    void initialize();
  }, []);

  const reducer: EditMeasureReducer = {
    updateMeasureMethod,
    updateMeasureDate,
    updateMeasureValueForMethod,
    save,
  };

  return { state, onEvent, reducer };
}

function getMeasureValuesForMethod(method: MeasureMethod): MeasureValue[] {
  return MeasureValues.filter(value => isMeasureRequiredForMethod({ value, method }));
}

function fillValues(
  data: MeasuresData,
  measuresValues: MeasureValue[],
): MeasureValueData[] {
  return measuresValues.map((measureValue) => {
    const value = currentValueForMeasure({ measure: data, value: measureValue }) || 0;
    return {
      measureValue,
      value,
      intValue: Math.trunc(value),
      decimalValue: value % 1,
    };
  });
}
