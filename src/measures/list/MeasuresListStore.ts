import { useRef } from 'react'
import { MeasuresData } from '../model/MeassuresModel'
import { deleteMeasure, findMeasures } from '../model/MeasuresRepository'

import { OnStateEvent, useStateEvent } from '@/src/common/components/OnStateEvent'
import { create } from 'zustand'

export interface MeasuresListState {
  isError: boolean
  isLoading: boolean
  measures: MeasuresData[]
}

export interface MeasuresListReducer {
  loadMeasures: () => Promise<void>
  openNewMeasure: () => void
  openViewMeasure: (id: string) => void
  deleteMeasure: (id: string) => void
}

// Events
export class GoNewMeasure {}
export class GoViewMeasure {
  constructor(public uuid: string) {}
}

export function useMeasuresListSore() {
  const [onEvent, emitEvent] = useStateEvent<GoNewMeasure | GoViewMeasure>()

  const storeRef = useRef(
    create<{
      state: MeasuresListState
      onEvent: OnStateEvent<GoNewMeasure | GoViewMeasure>
      reducer: MeasuresListReducer
    }>((set, get) => ({
      state: {
        isError: false,
        isLoading: true,
        measures: []
      },
      onEvent: onEvent,
      reducer: {
        loadMeasures: async () => {
          set((s) => {
            const state = s.state
            state.isLoading = s.state.measures.length === 0
            return { state }
          })

          const measures = await findMeasures()
          set((s) => {
            const state = s.state
            state.isError = false
            state.isLoading = false
            state.measures = measures || []
            return { state }
          })
        },
        openNewMeasure: () => {
          emitEvent(new GoNewMeasure())
        },
        openViewMeasure: (uuid: string) => {
          emitEvent(new GoViewMeasure(uuid))
        },
        deleteMeasure: async (id: string) => {
          set((s) => {
            const state = s.state
            state.isLoading = s.state.measures.length === 0
            return { state }
          })
          await deleteMeasure(id)
          get().reducer.loadMeasures()
        }
      }
    }))
  )

  return storeRef.current
}
