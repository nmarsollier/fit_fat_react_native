import { Dispatch } from '@reduxjs/toolkit'
import React, { useCallback, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import { useI18n } from '@/common/i18n/Internationalization'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useFocusEffect } from 'expo-router'
import { LabeledRadioButton } from '../common/components/LabeledRadioButton'
import { ColumnLayout, RowLayout } from '../common/components/Layouts'
import LoadingView from '../common/components/LoadingView'
import { Stretch } from '../common/components/Stretch'
import Toolbar from '../common/components/Toolbar'
import { dateToString, displayDate, stringToDate } from '../common/libs/DateLibs'
import { ColorSchema } from '../common/ui/ColorSchema'
import {
  measureHeightStringId,
  MeasureType,
  measureTypeStringId,
  measureWeightStringId,
  PreferencesData,
  Sex,
  sexStringId
} from './PreferencesModel'
import {
  loadPreferences,
  preferencesSelector,
  savePreferences,
  updateBirthDate,
  updateDisplayName,
  updateHeight,
  updateMeasureSystem,
  updateSex,
  updateWeight
} from './PreferencesState'

export default function PreferencesScreen() {
  const dispatch = useDispatch<Dispatch<any>>()
  const intl = useI18n()
  const preferencesState = useSelector(preferencesSelector)

  useFocusEffect(
    useCallback(() => {
      dispatch(loadPreferences())

      return () => {
        dispatch(savePreferences())
      }
    }, [])
  )

  if (!preferencesState?.preferences || preferencesState.isLoading) {
    return <LoadingView />
  }

  return (
    <ColumnLayout
      style={{
        backgroundColor: ColorSchema.secondary
      }}>
      <Toolbar>
        <Text
          variant="titleLarge"
          style={{
            color: ColorSchema.secondary
          }}>
          {intl.formatMessage('homeOptionsTitle')} :
        </Text>
      </Toolbar>

      <PreferencesContent dispatch={dispatch} userData={preferencesState.preferences} />

      <Stretch />
    </ColumnLayout>
  )
}

function PreferencesContent({
  dispatch,
  userData
}: {
  dispatch: Dispatch<any>
  userData: PreferencesData
}) {
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const intl = useI18n()

  return (
    <ScrollView>
      <ColumnLayout
        style={{
          paddingHorizontal: 16,
          rowGap: 8
        }}>
        <TextInput
          style={{
            paddingHorizontal: 0
          }}
          label={intl.formatMessage('optionsDisplayName')}
          value={userData.displayName}
          onChangeText={(val: string) => {
            dispatch(updateDisplayName(val))
          }}
        />

        <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
          <TextInput
            style={{
              paddingHorizontal: 0
            }}
            label={intl.formatMessage('optionsBirthDate')}
            editable={false}
            value={displayDate(userData.birthDate)}
          />
        </TouchableOpacity>

        <LabeledRadioButton
          style={{ paddingTop: 8 }}
          label={intl.formatMessage('optionsSystemOfMeasurement')}
          labels={[
            intl.formatMessage(measureTypeStringId(MeasureType.METRIC)),
            intl.formatMessage(measureTypeStringId(MeasureType.IMPERIAL))
          ]}
          options={[MeasureType.METRIC, MeasureType.IMPERIAL]}
          selected={MeasureType[userData.measureSystem]}
          onChange={(val: string) => {
            dispatch(updateMeasureSystem(MeasureType[val as keyof typeof MeasureType]))
          }}
        />

        <LabeledRadioButton
          label={intl.formatMessage('optionsSex')}
          labels={[
            intl.formatMessage(sexStringId(Sex.MALE)),
            intl.formatMessage(sexStringId(Sex.FEMALE))
          ]}
          options={[Sex.MALE, Sex.FEMALE]}
          selected={userData.sex}
          onChange={(val: string) => {
            dispatch(updateSex(Sex[val as keyof typeof Sex]))
          }}
        />

        <RowLayout>
          <TextInput
            style={{
              paddingHorizontal: 0
            }}
            label={intl.formatMessage('optionsWeight')}
            value={userData.weight.toString()}
            onChangeText={(val: string) => {
              dispatch(updateWeight(Number(val)))
            }}
          />

          <Text
            style={{
              color: ColorSchema.surface,
              paddingHorizontal: 16,
              paddingBottom: 5,
              alignSelf: 'flex-end'
            }}>
            {intl.formatMessage(measureWeightStringId(userData.measureSystem))} :
          </Text>
        </RowLayout>

        <RowLayout>
          <TextInput
            style={{
              paddingHorizontal: 0
            }}
            label={intl.formatMessage('optionsHeight')}
            value={userData.height.toString()}
            onChangeText={(val: string) => {
              dispatch(updateHeight(Number(val)))
            }}
          />

          <Text
            style={{
              color: ColorSchema.surface,
              paddingHorizontal: 16,
              paddingBottom: 5,
              alignSelf: 'flex-end'
            }}>
            {intl.formatMessage(measureHeightStringId(userData.measureSystem))} :
          </Text>
        </RowLayout>
      </ColumnLayout>

      {openDatePicker && (
        <RNDateTimePicker
          value={stringToDate(userData.birthDate)}
          mode="date"
          onChange={(date) => {
            setOpenDatePicker(false)
            if (date.type === 'set') {
              dispatch(updateBirthDate(dateToString(new Date(date.nativeEvent.timestamp))))
            }
          }}
        />
      )}
    </ScrollView>
  )
}
