import RNDateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Text, TextInput } from 'react-native-paper';
import ErrorView from '../../common/components/ErrorView';
import { ColumnLayout, RowLayout } from '../../common/components/Layouts';
import LoadingView from '../../common/components/LoadingView';
import { Stretch } from '../../common/components/Stretch';
import Toolbar from '../../common/components/Toolbar';
import {
  datetimeToString,
  displayDatetime,
  stringToDatetime
} from '../../common/libs/DateLibs';
import { EditMeasureScreenProps } from '../../common/navigation/Navigation';
import { ColorSchema } from '../../common/ui/ColorSchema';
import { LabelTheme, MenuTextTheme } from '../../common/ui/Themes';
import {
  unitTypeLabel,
} from '../model/MeassuresModel';
import { MeasureMethod, methodMessageId } from '../model/MeasureMethod';
import { InputType } from '../model/MeasureValues';
import {
  EditMeasureReducer,
  EditMeasureState,
  GoBack,
  MeasureValueData,
  useEditMeasureState,
} from './EditMeasureState';

export default function EditMeasureScreen({ route, navigation }: EditMeasureScreenProps) {
  const { state, onEvent, reducer } = useEditMeasureState(
    route.params.measureId,
  );

  onEvent((event: any) => {
    if (event === GoBack) {
      navigation.goBack();
    }
  });

  if (!state || state.isLoading) {
    return <LoadingView />;
  }

  if (state.isError) {
    return <ErrorView text="Error Loading Measure" />;
  }

  return <EditMeasureDetails state={state} reducer={reducer} />;
}

function EditMeasureDetails({ state, reducer }: {
  state: EditMeasureState;
  reducer: EditMeasureReducer;
}) {
  const [datePickerMode, setDatePickerMode] = useState<"date" | "time">("date");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const intl = useIntl();

  return (
    <ColumnLayout
      style={{
        backgroundColor: ColorSchema.secondary,
      }}>
      <Toolbar>
        <Text
          variant="titleLarge"
          style={{
            color: ColorSchema.secondary,
          }}>
          <FormattedMessage id="newMeasureTitle" />
        </Text>

        <Stretch />

        {state.isNew && (
          <TouchableOpacity
            onPress={() => {
              reducer.save();
            }}>
            <Text
              variant="bodyMedium"
              theme={MenuTextTheme}
              style={{ marginEnd: 24 }}>
              <FormattedMessage id="saveDialogTitle" />
            </Text>
          </TouchableOpacity>
        )}
      </Toolbar>

      <ScrollView style={{ margin: 16 }}>
        <RowLayout>
          <Dropdown
            style={{
              width: 200,
            }}
            disable={!state.isNew}
            data={measureMethods()}
            labelField="label"
            valueField="method"
            value={state.measure.measureMethod}
            onChange={item => {
              reducer.updateMeasureMethod(
                MeasureMethod[item.method as keyof typeof MeasureMethod],
              );
            }}
          />
        </RowLayout>

        <RowLayout style={{ marginBottom: 16 }}>
          <TouchableOpacity
            disabled={!state.isNew}
            onPress={() => {
              setDatePickerMode("date")
              setOpenDatePicker(true)
            }}
          >
            <TextInput
              style={{
                paddingHorizontal: 0,
                alignItems: 'center',
              }}
              label={intl.formatMessage({ id: 'newMeasureDate' })}
              editable={false}
              value={displayDatetime(state.measure.date)}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text theme={LabelTheme} variant="bodyMedium">
              <FormattedMessage id="measureFat" /> :
            </Text>

            <Text
              variant="bodyMedium"
              style={{ paddingStart: 5, paddingEnd: 5 }}>
              {state.measure.fatPercent}
            </Text>

            <Text theme={LabelTheme} variant="bodyMedium">
              %
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
              );
              break;
            }
            case InputType.DOUBLE: {
              return (
                <DoubleMeasureInput
                  key={data.measureValue.title}
                  data={data}
                  state={state}
                  reducer={reducer}
                />
              );
              break;
            }
          }
        })}
      </ScrollView>

      {openDatePicker &&
        <RNDateTimePicker
          value={stringToDatetime(state.measure.date)}
          mode={datePickerMode}
          onChange={date => {
            if (date.type === 'set') {
              reducer.updateMeasureDate(datetimeToString(new Date(date.nativeEvent.timestamp)));

              if (datePickerMode === 'date') {
                setDatePickerMode("time")
              } else {
                setOpenDatePicker(false);
              }
            } else {
              setOpenDatePicker(false);
            }
          }}
        />
      }
    </ColumnLayout>
  );
}

interface MeasureMethodElement {
  method: string;
  label: string;
}

function IntMeasureInput({ data, state, reducer }: {
  data: MeasureValueData;
  state: EditMeasureState;
  reducer: EditMeasureReducer;
}) {
  return (
    <ColumnLayout>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}>
        <Text theme={LabelTheme} variant="bodyMedium">
          <FormattedMessage id={data.measureValue.title} /> :
        </Text>

        <Text variant="bodyMedium" style={{ paddingStart: 5, paddingEnd: 5 }}>
          {data.value}
        </Text>

        <Text theme={LabelTheme} variant="bodyMedium">
          {unitTypeLabel(data.measureValue.unitType)}
        </Text>
      </View>

      {state.isNew && (
        <Slider
          thumbTintColor={ColorSchema.onSecondary}
          minimumTrackTintColor={ColorSchema.primary}
          maximumTrackTintColor={ColorSchema.primary}
          value={data.intValue}
          minimumValue={0}
          step={1}
          maximumValue={data.measureValue.maxScale}
          onValueChange={value => {
            reducer.updateMeasureValueForMethod(
              data.measureValue,
              value,
            );
          }}
        />
      )}
    </ColumnLayout>
  );
}

function DoubleMeasureInput({ data, state, reducer }: {
  data: MeasureValueData;
  state: EditMeasureState;
  reducer: EditMeasureReducer;
}) {
  return (
    <ColumnLayout>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        }}>
        <Text theme={LabelTheme} variant="bodyMedium">
          <FormattedMessage id={data.measureValue.title} /> :
        </Text>

        <Text variant="bodyMedium" style={{ paddingStart: 5, paddingEnd: 5 }}>
          {data.value}
        </Text>

        <Text theme={LabelTheme} variant="bodyMedium">
          {unitTypeLabel(data.measureValue.unitType)}
        </Text>
      </View>

      {state.isNew && (
        <Slider
          thumbTintColor={ColorSchema.onSecondary}
          minimumTrackTintColor={ColorSchema.primary}
          maximumTrackTintColor={ColorSchema.primary}
          value={data.intValue}
          minimumValue={0}
          step={1}
          maximumValue={data.measureValue.maxScale}
          onValueChange={value => {
            reducer.updateMeasureValueForMethod(
              data.measureValue,
              value,
            );
          }}
        />
      )}

      {state.isNew && (
        <Slider
          thumbTintColor={ColorSchema.onSecondary}
          minimumTrackTintColor={ColorSchema.primary}
          maximumTrackTintColor={ColorSchema.primary}
          value={data.decimalValue * 100}
          minimumValue={0}
          step={1}
          maximumValue={99}
          onValueChange={value => {
            reducer.updateMeasureValueForMethod(
              data.measureValue,
              value / 100,
            );
          }}
        />
      )}
    </ColumnLayout>
  );
}

function measureMethods(): MeasureMethodElement[] {
  const intl = useIntl();

  return [
    {
      method: MeasureMethod.JACKSON_POLLOCK_7,
      label: intl.formatMessage({ id: methodMessageId(MeasureMethod.JACKSON_POLLOCK_7) }),
    },
    {
      method: MeasureMethod.JACKSON_POLLOCK_3,
      label: intl.formatMessage({ id: methodMessageId(MeasureMethod.JACKSON_POLLOCK_3) }),
    },
    {
      method: MeasureMethod.JACKSON_POLLOCK_4,
      label: intl.formatMessage({ id: methodMessageId(MeasureMethod.JACKSON_POLLOCK_4) }),
    },
    {
      method: MeasureMethod.PARRILLO,
      label: intl.formatMessage({ id: methodMessageId(MeasureMethod.PARRILLO) }),
    },
    {
      method: MeasureMethod.DURNIN_WOMERSLEY,
      label: intl.formatMessage({ id: methodMessageId(MeasureMethod.DURNIN_WOMERSLEY) }),
    },
    {
      method: MeasureMethod.FROM_SCALE,
      label: intl.formatMessage({ id: methodMessageId(MeasureMethod.FROM_SCALE) }),
    },
    {
      method: MeasureMethod.WEIGHT_ONLY,
      label: intl.formatMessage({ id: methodMessageId(MeasureMethod.WEIGHT_ONLY) }),
    },
  ];
}
