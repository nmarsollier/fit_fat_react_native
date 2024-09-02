import RNDateTimePicker from '@react-native-community/datetimepicker'
import Slider from '@react-native-community/slider'
import React, { useEffect, useState } from 'react'
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { Text, TextInput } from 'react-native-paper'

import { IcCheck } from '@/assets/svg'
import ErrorView from '@/src/common/components/ErrorView'
import { ColumnLayout, RowLayout } from '@/src/common/components/Layouts'
import LoadingView from '@/src/common/components/LoadingView'
import { Stretch } from '@/src/common/components/Stretch'
import Toolbar from '@/src/common/components/Toolbar'
import { dateTimeToString, displayDateTime, stringToDateTime } from '@/src/common/libs/DateLibs'
import { ColorSchema } from '@/src/common/ui/ColorSchema'
import { LabelTheme } from '@/src/common/ui/Themes'
import { useLocalization } from '@/src/localization/useLocalization'
import { useRouter } from 'expo-router'
import { MeasureMethod, methodStringId } from '../model/MeasureMethod'
import { InputType, unitTypeStringId } from '../model/MeasureValues'
import {
  EditMeasureReducer,
  EditMeasureState,
  GoBack,
  MeasureValueData,
  useEditMeasureStore
} from './EditMeasureStore'

export default function EditMeasureScreen({ measureId }: { measureId: string | undefined }) {
  const route = useRouter()
  const { state, onEvent, reducer } = useEditMeasureStore()((state) => state)

  useEffect(() => {
    reducer.initialize(measureId)
  }, [measureId])

  onEvent((event) => {
    if (event === GoBack) {
      route.back()
    }
  })

  if (!state || state.isLoading) {
    return <LoadingView />
  }

  if (state.isError) {
    return <ErrorView text="Error Loading Measure" />
  }

  return <EditMeasureDetails state={state} reducer={reducer} />
}

function EditMeasureDetails({
  state,
  reducer
}: {
  state: EditMeasureState
  reducer: EditMeasureReducer
}) {
  const [datePickerMode, setDatePickerMode] = useState<'date' | 'time'>('date')
  const [openDatePicker, setOpenDatePicker] = useState(false)
  const localize = useLocalization()

  const handleOpenDatePicker = () => {
    if (!state.isNew) return
    setDatePickerMode('date')
    setOpenDatePicker(true)
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
          {localize('newMeasureTitle')}
        </Text>

        <Stretch />

        {state.isNew && (
          <TouchableOpacity
            onPress={() => {
              reducer.save()
            }}>
            <IcCheck
              width={24}
              height={24}
              color={state.isSaveEnabled ? ColorSchema.onPrimary : ColorSchema.onPrimaryVariant}
              style={{ marginEnd: 16 }}
            />
          </TouchableOpacity>
        )}
      </Toolbar>

      <ScrollView style={{ margin: 16 }}>
        <RowLayout>
          <Dropdown
            style={{
              width: 200
            }}
            disable={!state.isNew}
            data={measureMethods()}
            labelField="label"
            valueField="method"
            value={state.measure.measureMethod}
            onChange={(item) => {
              reducer.updateMeasureMethod(MeasureMethod[item.method as keyof typeof MeasureMethod])
            }}
          />
        </RowLayout>

        <RowLayout style={{ marginBottom: 16 }}>
          <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
            <TextInput
              style={{
                paddingHorizontal: 0,
                alignItems: 'center'
              }}
              label={localize('newMeasureDate')}
              editable={false}
              onPress={() => {
                handleOpenDatePicker()
              }}
              error={state.errors.date !== undefined}
              value={displayDateTime(state.measure.date)}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Text theme={LabelTheme} variant="bodyMedium">
              {localize('measureFat')} :
            </Text>

            <Text variant="bodyMedium" style={{ paddingStart: 5, paddingEnd: 5 }}>
              {state.measure.fatPercent}
            </Text>

            <Text theme={LabelTheme} variant="bodyMedium">
              {localize('unitPercent')}
            </Text>
          </View>
        </RowLayout>

        {state.measureValues.map((data) => {
          switch (data.measureValue.inputType) {
            case InputType.INT: {
              return (
                <IntMeasureInput
                  key={data.measureValue.title}
                  data={data}
                  state={state}
                  reducer={reducer}
                />
              )
            }
            case InputType.DOUBLE: {
              return (
                <DoubleMeasureInput
                  key={data.measureValue.title}
                  data={data}
                  state={state}
                  reducer={reducer}
                />
              )
            }
          }
        })}
      </ScrollView>

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
            value={stringToDateTime(state.measure.date)}
            mode={datePickerMode}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(date) => {
              if (date.type === 'set') {
                reducer.updateMeasureDate(dateTimeToString(new Date(date.nativeEvent.timestamp)))

                if (datePickerMode === 'date') {
                  setDatePickerMode('time')
                } else {
                  setOpenDatePicker(false)
                }
              } else {
                setOpenDatePicker(false)
              }
            }}
          />
        </View>
      )}
    </ColumnLayout>
  )
}

interface MeasureMethodElement {
  method: string
  label: string
}

function IntMeasureInput({
  data,
  state,
  reducer
}: {
  data: MeasureValueData
  state: EditMeasureState
  reducer: EditMeasureReducer
}) {
  const localize = useLocalization()

  return (
    <ColumnLayout>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center'
        }}>
        <Text theme={LabelTheme} variant="bodyMedium">
          {localize(data.measureValue.title)} :
        </Text>

        <Text variant="bodyMedium" style={{ paddingStart: 5, paddingEnd: 5 }}>
          {data.value}
        </Text>

        <Text theme={LabelTheme} variant="bodyMedium">
          {localize(unitTypeStringId(data.measureValue.unitType))}
        </Text>
      </View>

      {state.isNew && (
        <Slider
          thumbTintColor={ColorSchema.onSecondary}
          minimumTrackTintColor={ColorSchema.surface}
          maximumTrackTintColor={ColorSchema.surface}
          value={data.intValue}
          minimumValue={0}
          step={1}
          maximumValue={data.measureValue.maxScale}
          onValueChange={(value) => {
            reducer.updateMeasureValueForMethod(data.measureValue, value)
          }}
        />
      )}
    </ColumnLayout>
  )
}

function DoubleMeasureInput({
  data,
  state,
  reducer
}: {
  data: MeasureValueData
  state: EditMeasureState
  reducer: EditMeasureReducer
}) {
  const localize = useLocalization()
  return (
    <ColumnLayout>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center'
        }}>
        <Text theme={LabelTheme} variant="bodyMedium">
          {localize(data.measureValue.title)} :
        </Text>

        <Text variant="bodyMedium" style={{ paddingStart: 5, paddingEnd: 5 }}>
          {data.value}
        </Text>

        <Text theme={LabelTheme} variant="bodyMedium">
          {localize(unitTypeStringId(data.measureValue.unitType))} :
        </Text>
      </View>

      {state.isNew && (
        <Slider
          thumbTintColor={ColorSchema.onSecondary}
          minimumTrackTintColor={ColorSchema.surface}
          maximumTrackTintColor={ColorSchema.surface}
          value={data.intValue}
          minimumValue={0}
          step={1}
          maximumValue={data.measureValue.maxScale}
          onValueChange={(value) => {
            reducer.updateMeasureValueForMethod(data.measureValue, value)
          }}
        />
      )}

      {state.isNew && (
        <Slider
          thumbTintColor={ColorSchema.onSecondary}
          minimumTrackTintColor={ColorSchema.surface}
          maximumTrackTintColor={ColorSchema.surface}
          value={data.decimalValue * 100}
          minimumValue={0}
          step={1}
          maximumValue={99}
          onValueChange={(value) => {
            reducer.updateMeasureValueForMethod(data.measureValue, value / 100)
          }}
        />
      )}
    </ColumnLayout>
  )
}

function measureMethods(): MeasureMethodElement[] {
  const localize = useLocalization()

  return [
    {
      method: MeasureMethod.JACKSON_POLLOCK_7,
      label: localize(methodStringId(MeasureMethod.JACKSON_POLLOCK_7))
    },
    {
      method: MeasureMethod.JACKSON_POLLOCK_3,
      label: localize(methodStringId(MeasureMethod.JACKSON_POLLOCK_3))
    },
    {
      method: MeasureMethod.JACKSON_POLLOCK_4,
      label: localize(methodStringId(MeasureMethod.JACKSON_POLLOCK_4))
    },
    {
      method: MeasureMethod.PARRILLO,
      label: localize(methodStringId(MeasureMethod.PARRILLO))
    },
    {
      method: MeasureMethod.DURNIN_WOMERSLEY,
      label: localize(methodStringId(MeasureMethod.DURNIN_WOMERSLEY))
    },
    {
      method: MeasureMethod.FROM_SCALE,
      label: localize(methodStringId(MeasureMethod.FROM_SCALE))
    },
    {
      method: MeasureMethod.WEIGHT_ONLY,
      label: localize(methodStringId(MeasureMethod.WEIGHT_ONLY))
    }
  ]
}
