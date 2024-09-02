import React, { useCallback, useState } from 'react'
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'

import RNDateTimePicker from '@react-native-community/datetimepicker'
import { useFocusEffect } from 'expo-router'

import { LabeledRadioButton } from '@/src/common/components/LabeledRadioButton'
import { ColumnLayout, RowLayout } from '@/src/common/components/Layouts'
import LoadingView from '@/src/common/components/LoadingView'
import { Stretch } from '@/src/common/components/Stretch'
import Toolbar from '@/src/common/components/Toolbar'
import { dateToString, displayDate, stringToDate } from '@/src/common/libs/DateLibs'
import { ColorSchema } from '@/src/common/ui/ColorSchema'
import { useLocalization } from '@/src/localization/useLocalization'
import { PreferencesReducer, preferencesStore } from '@/src/preferences/PreferencesStore'
import {
  measureHeightStringId,
  MeasureType,
  measureTypeStringId,
  measureWeightStringId,
  PreferencesData,
  Sex,
  sexStringId
} from './PreferencesModel'

export default function PreferencesScreen() {
  const localize = useLocalization()
  const { state, reducer } = preferencesStore((state) => state)

  useFocusEffect(
    useCallback(() => {
      void reducer.loadPreferences()

      return () => {
        void reducer.savePreferences()
      }
    }, [])
  )

  if (!state?.preferences || state.isLoading) {
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
          {localize('homeOptionsTitle')} :
        </Text>
      </Toolbar>

      <PreferencesContent reducer={reducer} userData={state.preferences} />

      <Stretch />
    </ColumnLayout>
  )
}

function PreferencesContent({
  reducer,
  userData
}: {
  reducer: PreferencesReducer
  userData: PreferencesData
}) {
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const localize = useLocalization()

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
          label={localize('optionsDisplayName')}
          value={userData.displayName}
          onChangeText={(val: string) => {
            reducer.updatePartial({ displayName: val })
          }}
        />

        <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
          <TextInput
            style={{
              paddingHorizontal: 0
            }}
            label={localize('optionsBirthDate')}
            editable={false}
            onPress={() => setOpenDatePicker(true)}
            value={displayDate(userData.birthDate)}
          />
        </TouchableOpacity>

        <LabeledRadioButton
          style={{ paddingTop: 8 }}
          label={localize('optionsSystemOfMeasurement')}
          labels={[
            localize(measureTypeStringId(MeasureType.METRIC)),
            localize(measureTypeStringId(MeasureType.IMPERIAL))
          ]}
          options={[MeasureType.METRIC, MeasureType.IMPERIAL]}
          selected={MeasureType[userData.measureSystem]}
          onChange={(val: string) => {
            reducer.updatePartial({ measureSystem: MeasureType[val as keyof typeof MeasureType] })
          }}
        />

        <LabeledRadioButton
          label={localize('optionsSex')}
          labels={[localize(sexStringId(Sex.MALE)), localize(sexStringId(Sex.FEMALE))]}
          options={[Sex.MALE, Sex.FEMALE]}
          selected={userData.sex}
          onChange={(val: string) => {
            reducer.updatePartial({ sex: Sex[val as keyof typeof Sex] })
          }}
        />

        <RowLayout>
          <TextInput
            style={{
              paddingHorizontal: 0
            }}
            label={localize('optionsWeight')}
            value={userData.weight.toString()}
            onChangeText={(val: string) => {
              reducer.updatePartial({ weight: Number(val) })
            }}
          />

          <Text
            style={{
              color: ColorSchema.surface,
              paddingHorizontal: 16,
              paddingBottom: 5,
              alignSelf: 'flex-end'
            }}>
            {localize(measureWeightStringId(userData.measureSystem))}
          </Text>
        </RowLayout>

        <RowLayout>
          <TextInput
            style={{
              paddingHorizontal: 0
            }}
            label={localize('optionsHeight')}
            value={userData.height.toString()}
            onChangeText={(val: string) => {
              reducer.updatePartial({ height: Number(val) })
            }}
          />

          <Text
            style={{
              color: ColorSchema.surface,
              paddingHorizontal: 16,
              paddingBottom: 5,
              alignSelf: 'flex-end'
            }}>
            {localize(measureHeightStringId(userData.measureSystem))}
          </Text>
        </RowLayout>
      </ColumnLayout>

      {openDatePicker && (
        <View
          style={{
            borderWidth: 2,
            borderColor: ColorSchema.onPrimaryVariant,
            backgroundColor: ColorSchema.secondary,
            padding: 10,
            margin: 16,
            top: 100,
            position: 'absolute',
            alignSelf: 'center',
            zIndex: 1000
          }}>
          <RNDateTimePicker
            value={stringToDate(userData.birthDate)}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(date) => {
              setOpenDatePicker(false)
              if (date.type === 'set') {
                reducer.updatePartial({
                  birthDate: dateToString(new Date(date.nativeEvent.timestamp))
                })
              }
            }}
          />
        </View>
      )}
    </ScrollView>
  )
}
