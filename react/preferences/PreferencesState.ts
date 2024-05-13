import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { uuid } from '../common/libs/UUID';
import { MeasureType, PreferencesData, Sex } from './PreferencesModel';
import { findPreferences, storePreferences } from './PreferencesRepository';

export interface PreferencesState {
  isLoading: boolean;
  preferences?: PreferencesData;
}

const preferencesSlice = createSlice({
  name: 'datesList',
  initialState: {
    isLoading: true,
  } satisfies PreferencesState as PreferencesState,

  reducers: {
    updateDisplayName: (state, action: PayloadAction<string>) => {
      state.preferences = {
        ...state.preferences!,
        displayName: action.payload,
      };
    },
    updateBirthDate: (state, action: PayloadAction<string>) => {
      state.preferences = {
        ...state.preferences!,
        birthDate: action.payload,
      };
    },
    updateHeight: (state, action: PayloadAction<number>) => {
      state.preferences = {
        ...state.preferences!,
        height: action.payload,
      };
    },
    updateWeight: (state, action: PayloadAction<number>) => {
      state.preferences = {
        ...state.preferences!,
        weight: action.payload,
      };
    },
    updateSex: (state, action: PayloadAction<Sex>) => {
      state.preferences = {
        ...state.preferences!,
        sex: action.payload,
      };
    },
    updateMeasureSystem: (state, action: PayloadAction<MeasureType>) => {
      state.preferences = {
        ...state.preferences!,
        measureSystem: action.payload,
      };
    },
    update: (state, action: PayloadAction<PreferencesState>) => {
      state.isLoading = action.payload.isLoading;
      state.preferences = action.payload.preferences;
    },
  },
});

export const loadPreferences = () => {
  return async (
    dispatch: (action: PayloadAction<PreferencesState>) => void,
    getState: () => void,
  ) => {
    const preferences = await findPreferences();

    if (preferences) {
      dispatch(
        preferencesSlice.actions.update({
          isLoading: false,
          preferences,
        }),
      );
    } else {
      dispatch(
        preferencesSlice.actions.update({
          isLoading: false,
          preferences: {
            uid: uuid(),
            displayName: '',
            birthDate: '',
            weight: 70,
            height: 150,
            sex: Sex.MALE,
            measureSystem: MeasureType.METRIC,
          },
        }),
      );
    }
  };
};

export const savePreferences = () => {
  return async (
    dispatch: (action: PayloadAction<PreferencesState>) => void,
    getState: () => { preferencesReducer: PreferencesState },
  ) => {
    const prefs = getState().preferencesReducer.preferences;
    if (prefs) {
      storePreferences(prefs);
    }
  };
};

export const preferencesReducer = preferencesSlice.reducer;

export const {
  updateDisplayName,
  updateBirthDate,
  updateHeight,
  updateWeight,
  updateSex,
  updateMeasureSystem,
} = preferencesSlice.actions;

export const preferencesSelector = createSelector<any, PreferencesState>(
  (state: any) => state.preferencesReducer,
  reducer => {
    return { ...reducer };
  },
);
