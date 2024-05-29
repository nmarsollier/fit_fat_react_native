import { useOnStateEvent } from '@/common/components/OnStateEvent';
import { datetimeToString } from '@/common/libs/DateLibs';
import { uuid } from '@/common/libs/UUID';
import {
  currentMeasureValue,
  MeasuresData,
  newMeasuresData,
  updateMeasureValue,
} from '@/measures/model/MeassuresModel';
import { MeasureMethod } from '@/measures/model/MeasureMethod';
import {
  findLastMeasure,
  findMeasure,
  storeMeasure,
} from '@/measures/model/MeasuresRepository';
import { getMeasureValuesForMethod, MeasureValue } from '@/measures/model/MeasureValues';
import { useEffect, useState } from 'react';

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
      let assignValue = currentMeasureValue({ measure: s.measure, measureValue: measureValue }) || 0;
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

      const newMeasure = updateMeasureValue({
        measure: s.measure,
        measureValue: measureValue,
        value: assignValue
      })

      const newMeasureValues = fillValues(
        newMeasure,
        getMeasureValuesForMethod(newMeasure.measureMethod),
      );

      return {
        ...s,
        measure: newMeasure,
        measureValues: newMeasureValues
      };
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

function fillValues(
  data: MeasuresData,
  measuresValues: MeasureValue[],
): MeasureValueData[] {
  return measuresValues.map((measureValue) => {
    const value = currentMeasureValue({ measure: data, measureValue: measureValue }) || 0;
    return {
      measureValue,
      value,
      intValue: Math.trunc(value),
      decimalValue: value % 1,
    };
  });
}
