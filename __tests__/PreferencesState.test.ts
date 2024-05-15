import { CallbackWithResult } from "@react-native-async-storage/async-storage/lib/typescript/types";
import configureStore from "redux-mock-store";
import { thunk } from 'redux-thunk';
import { MeasureType, Sex } from "../app/preferences/PreferencesModel";
import { loadPreferences, preferencesReducer, PreferencesState, updateBirthDate, updateDisplayName, updateHeight, updateMeasureSystem, updateSex, updateWeight } from "../app/preferences/PreferencesState";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState: PreferencesState = {
  isLoading: false,
  preferences: {
    uid: "uuid",
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
      key: string,
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
  expect(preferencesReducer(initialState, updateDisplayName("Test Name"))).toStrictEqual(
    {
      isLoading: false,
      preferences: {
        uid: "uuid",
        displayName: "Test Name",
        birthDate: '',
        weight: 70,
        height: 150,
        sex: Sex.MALE,
        measureSystem: MeasureType.METRIC,
      },
    }
  );

  expect(preferencesReducer(initialState, updateBirthDate("2020-01-01"))).toStrictEqual(
    {
      isLoading: false,
      preferences: {
        uid: "uuid",
        displayName: '',
        birthDate: "2020-01-01",
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
        uid: "uuid",
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
        uid: "uuid",
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
        uid: "uuid",
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
        uid: "uuid",
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
      uid: "uuid",
      displayName: '',
      birthDate: '',
      weight: 70,
      height: 150,
      sex: "MALE",
      measureSystem: "METRIC",
    })
  );

  const store = mockStore(initialState)

  store.dispatch(loadPreferences()).then(() => {
    const actions = store.getActions()

    expect(actions).toStrictEqual(
      [
        {
          type: 'preferences/update',
          payload: {
            isLoading: false,
            preferences: {
              uid: "uuid",
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

  store.dispatch(loadPreferences()).then(() => {
    const actions = store.getActions()

    expect(actions).toStrictEqual(
      [
        {
          type: 'preferences/update',
          payload: {
            isLoading: false,
            preferences: {
              uid: actions[0].payload.preferences.uid,
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
