import { create } from 'zustand'
import { uuid } from '../common/libs/UUID'
import { MeasureType, PreferencesData, Sex } from './PreferencesModel'
import { findPreferences, storePreferences } from './PreferencesRepository'

export interface PreferencesState {
  isLoading: boolean
  preferences?: PreferencesData
}

export interface PreferencesReducer {
  updatePartial: (partial: Partial<PreferencesData>) => void
  loadPreferences: () => Promise<void>
  savePreferences: () => Promise<void>
}

export const preferencesStore = create<{
  state: PreferencesState
  reducer: PreferencesReducer
}>((set, get) => ({
  state: {
    isLoading: true,
    preferences: undefined
  },
  reducer: {
    updatePartial: (partial: Partial<PreferencesData>) => {
      set((s) => {
        const state = s.state
        state.preferences = { ...state.preferences!, ...partial }
        return { state }
      })
    },
    loadPreferences: async () => {
      const preferences = await findPreferences()

      if (preferences) {
        set((s) => {
          const state = s.state
          state.isLoading = false
          state.preferences = preferences
          return { state }
        })
      } else {
        set((s) => {
          const state = s.state
          state.isLoading = false
          state.preferences = {
            id: uuid(),
            displayName: '',
            birthDate: '',
            weight: 70,
            height: 150,
            sex: Sex.MALE,
            measureSystem: MeasureType.METRIC
          }
          return { state }
        })
      }
    },

    savePreferences: async () => {
      const preferences = get()
      if (preferences.state.preferences) {
        await storePreferences(preferences.state.preferences)
      }
    }
  }
}))
