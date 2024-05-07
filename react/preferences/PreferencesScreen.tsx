import { useFocusEffect } from '@react-navigation/native';
import { createSelector, Dispatch } from '@reduxjs/toolkit';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { LabeledRadioButton } from '../common/components/LabeledRadioButton';
import { ColumnLayout, RowLayout } from '../common/components/Layouts';
import LoadingView from '../common/components/LoadingView';
import Toolbar from '../common/components/Toolbar';
import { dateToString, displayDate, stringToDate } from '../common/libs/DateLibs';
import { ColorSchema } from '../common/ui/ColorSchema';
import {
  measureHeight,
  MeasureType,
  measureTypeName,
  measureWeight,
  PreferencesData,
  Sex,
  sexName,
} from './PreferencesModel';
import { loadPreferences, PreferencesState, savePreferences, updateBirthDate, updateDisplayName, updateHeight, updateMeasureSystem, updateSex, updateWeight } from './PreferencesState';

const preferencesSelect = createSelector<any, PreferencesState>(
  (state: any) => state.preferencesReducer,
  (preferencesReducer) => {
    return { ...preferencesReducer };
  },
);

export default function PreferencesScreen() {
  const dispatch = useDispatch<Dispatch<any>>();

  const preferencesState = useSelector(preferencesSelect);

  useFocusEffect(
    useCallback(() => {
      dispatch(loadPreferences());

      return () => {
        dispatch(savePreferences());
      }
    }, []),
  );

  if (!preferencesState?.preferences || preferencesState.isLoading) {
    return LoadingView();
  }

  return (
    <ColumnLayout
      style={{
        backgroundColor: ColorSchema.background,
      }}>
      <Toolbar>
        <Text
          style={{
            color: ColorSchema.secondary,
            fontSize: 24,
          }}>
          Preferences
        </Text>
      </Toolbar>

      <PreferencesContent dispatch={dispatch} userData={preferencesState.preferences!} />
    </ColumnLayout>
  );
}

function PreferencesContent(props: {
  dispatch: Dispatch<any>,
  userData: PreferencesData
}) {
  const [openDatePicker, setOpenDatePicker] = useState(false)

  return (
    <ScrollView>
      <ColumnLayout
        style={{
          paddingHorizontal: 16,
          rowGap: 8,
        }}>
        <TextInput
          style={{
            paddingHorizontal: 0,
          }}
          label="Display Name"
          value={props.userData.displayName}
          onChangeText={(val: string) => {
            props.dispatch(updateDisplayName(val))
          }}
        />

        <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
          <TextInput
            style={{
              paddingHorizontal: 0,
            }}
            label="Birth Date"
            editable={false}
            value={displayDate(props.userData.birthDate)}
          />
        </TouchableOpacity>

        <LabeledRadioButton
          style={{ paddingTop: 8 }}
          label="Metric System"
          labels={[
            measureTypeName(MeasureType.METRIC),
            measureTypeName(MeasureType.IMPERIAL),
          ]}
          options={[MeasureType.METRIC, MeasureType.IMPERIAL]}
          selected={MeasureType[props.userData.measureSystem]}
          onChange={(val: string) => {
            props.dispatch(updateMeasureSystem(MeasureType[val as keyof typeof MeasureType]))
          }}
        />

        <LabeledRadioButton
          label="Sex"
          labels={[sexName(Sex.MALE), sexName(Sex.FEMALE)]}
          options={[Sex.MALE, Sex.FEMALE]}
          selected={props.userData.sex}
          onChange={(val: string) => {
            props.dispatch(updateSex(Sex[val as keyof typeof Sex]))
          }}
        />

        <RowLayout>
          <TextInput
            style={{
              paddingHorizontal: 0,
            }}
            label="Weight"
            value={props.userData.weight.toString()}
            onChangeText={(val: string) => {
              props.dispatch(updateWeight(Number(val)))
            }}
          />

          <Text
            style={{
              color: ColorSchema.secondaryVariant,
              paddingHorizontal: 16,
              paddingBottom: 5,
              alignSelf: 'flex-end',
            }}>
            {measureWeight(props.userData.measureSystem)}
          </Text>
        </RowLayout>

        <RowLayout>
          <TextInput
            style={{
              paddingHorizontal: 0,
            }}
            label="Height"
            value={props.userData.height.toString()}
            onChangeText={(val: string) => {
              props.dispatch(updateHeight(Number(val)))
            }}
          />

          <Text
            style={{
              color: ColorSchema.secondaryVariant,
              paddingHorizontal: 16,
              paddingBottom: 5,
              alignSelf: 'flex-end',
            }}>
            {measureHeight(props.userData.measureSystem)}
          </Text>
        </RowLayout>
      </ColumnLayout>

      <DatePicker
        modal
        open={openDatePicker}
        date={stringToDate(props.userData.birthDate)}
        mode="date"
        onConfirm={(date) => {
          setOpenDatePicker(false)
          props.dispatch(updateBirthDate(dateToString(date)))
        }}
        onCancel={() => {
          setOpenDatePicker(false)
        }}
      />
    </ScrollView>
  );
}
