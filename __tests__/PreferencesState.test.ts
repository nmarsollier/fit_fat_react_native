import { CallbackWithResult } from '@react-native-async-storage/async-storage/lib/typescript/types';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { MeasureType, Sex } from '../app/preferences/PreferencesModel';
import {
  loadPreferences,
  preferencesReducer,
  PreferencesState,
  updateBirthDate,
  updateDisplayName,
  updateHeight,
  updateMeasureSystem,
  updateSex,
  updateWeight
} from '../app/preferences/PreferencesState';

const middlewares = [thunk]

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const mockStore = configureStore(middlewares)

const initialState: PreferencesState = {
  isLoading: false,
  preferences: {
    id: 'uuid',
    displayName: '',
    birthDate: '',
    weight: 70,
    height: 150,
    sex: Sex.MALE,
    measureSystem: MeasureType.METRIC,
  },
}

let mockGetIem = () => Promise.reject<string>()
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(
    (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      key: string,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      callback?: CallbackWithResult<string>
    ) => {
      return mockGetIem()
    })
}));

test('PreferencesState initial', () => {
  expect(preferencesReducer(undefined, { type: 'unknown' })).toStrictEqual(
    {
      isLoading: true
    }
  );

  expect(preferencesReducer(initialState, { type: 'unknown' })).toStrictEqual(
    initialState
  );
})

test('PreferencesState update preferences data', () => {
  expect(preferencesReducer(initialState, updateDisplayName('Test Name'))).toStrictEqual(
    {
      isLoading: false,
      preferences: {
        id: 'uuid',
        displayName: 'Test Name',
        birthDate: '',
        weight: 70,
        height: 150,
        sex: Sex.MALE,
        measureSystem: MeasureType.METRIC,
      },
    }
  );

  expect(preferencesReducer(initialState, updateBirthDate('2020-01-01'))).toStrictEqual(
    {
      isLoading: false,
      preferences: {
        id: 'uuid',
        displayName: '',
        birthDate: '2020-01-01',
        weight: 70,
        height: 150,
        sex: Sex.MALE,
        measureSystem: MeasureType.METRIC,
      },
    }
  );

  expect(preferencesReducer(initialState, updateHeight(50))).toStrictEqual(
    {
      isLoading: false,
      preferences: {
        id: 'uuid',
        displayName: '',
        birthDate: '',
        weight: 70,
        height: 50,
        sex: Sex.MALE,
        measureSystem: MeasureType.METRIC,
      },
    });

  expect(preferencesReducer(initialState, updateWeight(35))).toStrictEqual(
    {
      isLoading: false,
      preferences: {
        id: 'uuid',
        displayName: '',
        birthDate: '',
        weight: 35,
        height: 150,
        sex: Sex.MALE,
        measureSystem: MeasureType.METRIC,
      },
    });

  expect(preferencesReducer(initialState, updateSex(Sex.FEMALE))).toStrictEqual(
    {
      isLoading: false,
      preferences: {
        id: 'uuid',
        displayName: '',
        birthDate: '',
        weight: 70,
        height: 150,
        sex: Sex.FEMALE,
        measureSystem: MeasureType.METRIC,
      },
    });

  expect(preferencesReducer(initialState, updateMeasureSystem(MeasureType.IMPERIAL))).toStrictEqual(
    {
      isLoading: false,
      preferences: {
        id: 'uuid',
        displayName: '',
        birthDate: '',
        weight: 70,
        height: 150,
        sex: Sex.MALE,
        measureSystem: MeasureType.IMPERIAL,
      },
    });
})


test('PreferencesState loadPreferences', () => {
  mockGetIem = () => Promise.resolve(
    JSON.stringify({
      id: 'uuid',
      displayName: '',
      birthDate: '',
      weight: 70,
      height: 150,
      sex: 'MALE',
      measureSystem: 'METRIC',
    })
  );

  const store = mockStore(initialState)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  store.dispatch(loadPreferences()).then(() => {
    const actions = store.getActions()

    expect(actions).toStrictEqual(
      [
        {
          type: 'preferences/update',
          payload: {
            isLoading: false,
            preferences: {
              id: 'uuid',
              displayName: '',
              birthDate: '',
              weight: 70,
              height: 150,
              sex: Sex.MALE,
              measureSystem: MeasureType.METRIC,
            },
          }
        }
      ])
  })
})


test('PreferencesState loadPreferences error', () => {
  mockGetIem = () => Promise.reject()

  const store = mockStore(initialState)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  store.dispatch(loadPreferences()).then(() => {
    const actions = store.getActions()

    expect(actions).toStrictEqual(
      [
        {
          type: 'preferences/update',
          payload: {
            isLoading: false,
            preferences: {
              id: actions[0].payload.preferences.id,
              displayName: '',
              birthDate: '',
              weight: 70,
              height: 150,
              sex: Sex.MALE,
              measureSystem: MeasureType.METRIC,
            },
          }
        }
      ])
  })
})
