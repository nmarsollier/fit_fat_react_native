import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { preferencesSelector } from '../../preferences/PreferencesState'
import { MeasuresData } from '../model/MeassuresModel'
import { findMeasures } from '../model/MeasuresRepository'

import { useFocusEffect } from 'expo-router'
import { useOnStateEvent } from '../../common/components/OnStateEvent'

export interface MeasuresListState {
  isError: boolean
  isLoading: boolean
  measures: MeasuresData[]
}

export interface MeasuresListReducer {
  openNewMeasure: () => void
  openViewMeasure: (id: string) => void
}

// Events
export const GoNewMeasure = {}
export class GoViewMeasure {
  constructor(public uuid: string) {}
}

export function useMeasuresListState() {
  const [state, setState] = useState<MeasuresListState>({
    isError: false,
    isLoading: true,
    measures: []
  })

  const [onEvent, emitEvent] = useOnStateEvent()

  const preferencesState = useSelector(preferencesSelector)

  const loadMeasures = async () => {
    setState((s) => {
      return {
        ...s,
        isLoading: s.measures.length === 0
      }
    })

    const measures = await findMeasures()
    setState({
      isError: false,
      isLoading: false,
      measures: measures || []
    })
    return
  }

  const openNewMeasure = () => {
    emitEvent(GoNewMeasure)
  }

  const openViewMeasure = (uuid: string) => {
    emitEvent(new GoViewMeasure(uuid))
  }

  useFocusEffect(
    useCallback(() => {
      void loadMeasures()
    }, [])
  )

  return {
    state,
    onEvent,
    preferences: preferencesState.preferences,
    reducer: {
      openNewMeasure,
      openViewMeasure
    }
  }
}
