import { newStateEventHandler } from '@/src/common/components/OnStateEvent'
import { dateTimeToString } from '@/src/common/libs/DateLibs'
import { uuid } from '@/src/common/libs/UUID'
import { hasErrors, validatePartial } from '@/src/common/validation/validationTools'
import { StringResource } from '@/src/localization/translations'
import {
  currentMeasureValue,
  MeasuresData,
  updateMeasureValue
} from '@/src/measures/model/MeassuresModel'
import { MeasureMethod } from '@/src/measures/model/MeasureMethod'
import { findLastMeasure, findMeasure, storeMeasure } from '@/src/measures/model/MeasuresRepository'
import { getMeasureValuesForMethod, MeasureValue } from '@/src/measures/model/MeasureValues'
import { useRef } from 'react'
import { create } from 'zustand'

// STATE
export interface EditMeasureState {
  isNew: boolean
  isError: boolean
  isLoading: boolean
  measure: MeasuresData
  measureValues: MeasureValueData[]
  errors: Record<string, StringResource | undefined>
  isSaveEnabled: boolean
}

export interface MeasureValueData {
  measureValue: MeasureValue
  value: number
  intValue: number
  decimalValue: number
}

// EVENTS
export class GoBack {}

/**
 * EditMeasureReducer interface represents the reducer for editing measures.
 * It provides methods for initializing, saving, and updating measure properties.
 */
export interface EditMeasureReducer {
  initialize: (measureId?: string) => void
  save: () => void
  updateMeasureDate: (date: string) => void
  updateMeasureMethod: (method: MeasureMethod) => void
  updateMeasureValueForMethod: (measureValue: MeasureValue, value: number) => void
}

const initialState = {
  isNew: true,
  isError: false,
  isLoading: true,
  errors: {},
  isSaveEnabled: false,
  measure: new MeasuresData(),
  measureValues: []
}

const [onEvent, emitEvent] = newStateEventHandler<GoBack>()

export { onEvent as onEditMeasureEvent }

export function useEditMeasureStore() {
  const storeRef = useRef(
    create<{
      state: EditMeasureState
      reducer: EditMeasureReducer
    }>((set, get) => ({
      state: initialState,
      reducer: {
        initialize: async (measureId?: string) => {
          set((s) => {
            const state = { ...s.state }
            state.isLoading = true
            state.isNew = measureId === undefined
            state.isError = false
            state.isSaveEnabled = false
            state.errors = {}
            return { state }
          })

          let measure = new MeasuresData()

          if (measureId) {
            try {
              const last = await findMeasure(measureId)
              if (last) {
                measure = last
              }
            } catch (e) {
              console.log(e)
            }
          } else {
            const last = await findLastMeasure()
            if (last) {
              measure = {
                ...last,
                id: uuid(),
                date: dateTimeToString(new Date())
              }
            }
          }

          const err = validatePartial(MeasuresData, measure)
          set((s) => {
            const state = { ...s.state }
            state.isLoading = false
            state.isNew = measureId === undefined
            state.isError = false
            state.measure = measure
            state.measureValues = fillValues(measure)
            state.errors = err
            state.isSaveEnabled = !hasErrors(err)
            return { state }
          })
        },
        save: () => {
          const s = get()
          if (!s.state.isSaveEnabled) {
            return
          }

          const err = validatePartial(MeasuresData, s.state.measure)
          if (hasErrors(err)) {
            set((s) => {
              const state = { ...s.state }
              state.isLoading = false
              state.errors = err
              state.isSaveEnabled = !hasErrors(err)
              return { state }
            })
            return
          }

          set((s) => {
            const state = { ...s.state }

            state.isLoading = true
            return { state }
          })
          set((s) => {
            storeMeasure(s.state.measure)
              .then(() => {
                emitEvent(GoBack)
              })
              .catch((e) => {
                set((s) => {
                  const state = { ...s.state }
                  state.isLoading = false
                  return { state }
                })
                console.log(e)
              })

            return s
          })
        },
        updateMeasureDate: (date: string) => {
          set((s) => {
            const state = { ...s.state }

            state.measure.date = date

            const err = validatePartial(MeasuresData, state.measure)
            state.errors = err
            state.isSaveEnabled = !hasErrors(err)
            return { state }
          })
        },
        updateMeasureMethod: (method: MeasureMethod) => {
          set((s) => {
            const state = { ...s.state }

            state.measure.measureMethod = method
            state.measureValues = fillValues(s.state.measure)

            const err = validatePartial(MeasuresData, state.measure)
            state.errors = err
            state.isSaveEnabled = !hasErrors(err)
            return { state }
          })
        },
        updateMeasureValueForMethod: (measureValue: MeasureValue, newValue: number) => {
          set((s) => {
            const state = { ...s.state }

            let assignValue =
              currentMeasureValue({ measure: state.measure, measureValue: measureValue }) || 0
            const currentValue = assignValue

            const intPart = Math.trunc(newValue)
            const decimalPart = Math.round((newValue % 1) * 100) / 100
            if (intPart > 0) {
              assignValue = newValue + (assignValue % 1)
            } else if (decimalPart > 0) {
              assignValue = Math.trunc(assignValue) + decimalPart
            }
            if (assignValue === currentValue) {
              return s
            }

            state.measure = updateMeasureValue({
              measure: state.measure,
              measureValue: measureValue,
              value: assignValue
            })

            state.measureValues = fillValues(state.measure)

            const err = validatePartial(MeasuresData, state.measure)
            state.errors = err
            state.isSaveEnabled = !hasErrors(err)

            return { state }
          })
        }
      }
    }))
  )
  return storeRef.current
}

function fillValues(data: MeasuresData): MeasureValueData[] {
  const measuresValues = getMeasureValuesForMethod(data.measureMethod)
  return measuresValues.map((measureValue) => {
    const value = currentMeasureValue({ measure: data, measureValue: measureValue }) || 0
    return {
      measureValue,
      value,
      intValue: Math.trunc(value),
      decimalValue: Math.round((value % 1) * 100) / 100
    }
  })
}
