import {Slider} from '@miblanchard/react-native-slider';
import React, {useState} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {Text, TextInput} from 'react-native-paper';
import ErrorView from '../../common/components/ErrorView';
import {ColumnLayout, RowLayout} from '../../common/components/Layouts';
import LoadingView from '../../common/components/LoadingView';
import {Stretch} from '../../common/components/Stretch';
import Toolbar from '../../common/components/Toolbar';
import {
  datetimeToString,
  displayDatetime,
  stringToDate,
} from '../../common/libs/DateLibs';
import {EditMeasureScreenProps} from '../../common/navigation/Navigation';
import {ColorSchema} from '../../common/ui/ColorSchema';
import {LabelTheme, MenuTextTheme} from '../../common/ui/Themes';
import {InputType, MeasureMethod, unitTypeLabel} from '../model/MeassuresModel';
import {
  EditMeasureReducer,
  EditMeasureState,
  GoBack,
  MeasureValueData,
  useEditMeasureState,
} from './EditMeasureState';

export default function EditMeasureScreen(props: EditMeasureScreenProps) {
  const {state, onEvent, reducer} = useEditMeasureState(
    props.route.params.measureId,
  );

  onEvent((event: any) => {
    if (event === GoBack) {
      props.navigation.goBack();
    }
  });

  if (!state || state.isLoading) {
    return <LoadingView />
  }

  if (state.isError) {
    return <ErrorView text="Error Loading Measure" />
  }

  return <EditMeasureDetails state={state} reducer={reducer} />
}

function EditMeasureDetails(props: {
  state: EditMeasureState;
  reducer: EditMeasureReducer;
}) {
  const {state, reducer} = props;
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const intl = useIntl();

  return (
    <ColumnLayout
      style={{
        backgroundColor: ColorSchema.background,
      }}>
      <Toolbar>
        <Text
          variant="titleMedium"
          style={{
            color: ColorSchema.secondary,
          }}>
          <FormattedMessage id="newMeasureTitle" />
        </Text>

        <Stretch />

        {state.isNew && (
          <TouchableOpacity
            onPress={() => {
              props.reducer.save();
            }}>
            <Text
              variant="bodyMedium"
              theme={MenuTextTheme}
              style={{marginEnd: 24}}>
              <FormattedMessage id="saveDialogTitle" />
            </Text>
          </TouchableOpacity>
        )}
      </Toolbar>

      <ScrollView style={{margin: 16}}>
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

        <RowLayout style={{marginBottom: 16}}>
          <TouchableOpacity
            disabled={!state.isNew}
            onPress={() => setOpenDatePicker(true)}>
            <TextInput
              style={{
                paddingHorizontal: 0,
                alignItems: 'center',
              }}
              label={intl.formatMessage({id: 'newMeasureDate'})}
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
            <Text theme={LabelTheme} variant="labelMedium">
              <FormattedMessage id="measureFat" /> :
            </Text>

            <Text variant="bodyMedium" style={{paddingStart: 5, paddingEnd: 5}}>
              {state.measure.fatPercent}
            </Text>

            <Text theme={LabelTheme} variant="labelMedium">
              %
            </Text>
          </View>
        </RowLayout>

        {state.measureValues.map((data, index) => {
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

      <DatePicker
        modal={true}
        open={openDatePicker}
        date={stringToDate(state.measure.date)}
        mode="datetime"
        onConfirm={date => {
          setOpenDatePicker(false);
          reducer.updateMeasureDate(datetimeToString(date));
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />
    </ColumnLayout>
  );
}

interface MeasureMethodElement {
  method: string;
  label: string;
}

function IntMeasureInput(props: {
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
        <Text theme={LabelTheme} variant="labelMedium">
          <FormattedMessage id={props.data.measureValue.title} /> :
        </Text>

        <Text variant="bodyMedium" style={{paddingStart: 5, paddingEnd: 5}}>
          {props.data.value}
        </Text>

        <Text theme={LabelTheme} variant="labelMedium">
          {unitTypeLabel(props.data.measureValue.unitType)}
        </Text>
      </View>

      {props.state.isNew && (
        <Slider
          thumbStyle={{height: 12, width: 12}}
          trackStyle={{borderRadius: 2, height: 2}}
          thumbTintColor={ColorSchema.primary}
          minimumTrackTintColor={ColorSchema.secondaryVariant}
          maximumTrackTintColor={ColorSchema.secondaryVariant}
          value={props.data.intValue}
          minimumValue={0}
          step={1}
          maximumValue={props.data.measureValue.maxScale}
          onValueChange={value => {
            props.reducer.setMeasureValueForMethod(
              props.data.measureValue,
              value[0],
            );
          }}
        />
      )}
    </ColumnLayout>
  );
}

function DoubleMeasureInput(props: {
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
        <Text theme={LabelTheme} variant="labelMedium">
          <FormattedMessage id={props.data.measureValue.title} /> :
        </Text>

        <Text variant="bodyMedium" style={{paddingStart: 5, paddingEnd: 5}}>
          {props.data.value}
        </Text>

        <Text theme={LabelTheme} variant="labelMedium">
          {unitTypeLabel(props.data.measureValue.unitType)}
        </Text>
      </View>

      {props.state.isNew && (
        <Slider
          thumbStyle={{height: 12, width: 12}}
          trackStyle={{borderRadius: 2, height: 2}}
          thumbTintColor={ColorSchema.primary}
          minimumTrackTintColor={ColorSchema.secondaryVariant}
          maximumTrackTintColor={ColorSchema.secondaryVariant}
          value={props.data.intValue}
          minimumValue={0}
          step={1}
          maximumValue={props.data.measureValue.maxScale}
          onValueChange={value => {
            props.reducer.setMeasureValueForMethod(
              props.data.measureValue,
              value[0],
            );
          }}
        />
      )}

      {props.state.isNew && (
        <Slider
          thumbStyle={{height: 12, width: 12}}
          trackStyle={{borderRadius: 2, height: 2}}
          thumbTintColor={ColorSchema.primary}
          minimumTrackTintColor={ColorSchema.secondaryVariant}
          maximumTrackTintColor={ColorSchema.secondaryVariant}
          value={props.data.decimalValue * 100}
          minimumValue={0}
          step={1}
          maximumValue={99}
          onValueChange={value => {
            props.reducer.setMeasureValueForMethod(
              props.data.measureValue,
              value[0] / 100,
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
      label: intl.formatMessage({id: 'measureMethodJacksonPollock7'}),
    },
    {
      method: MeasureMethod.JACKSON_POLLOCK_3,
      label: intl.formatMessage({id: 'measureMethodJacksonPollock3'}),
    },
    {
      method: MeasureMethod.JACKSON_POLLOCK_4,
      label: intl.formatMessage({id: 'measureMethodJacksonPollock4'}),
    },
    {
      method: MeasureMethod.PARRILLO,
      label: intl.formatMessage({id: 'measureMethodParrillo'}),
    },
    {
      method: MeasureMethod.DURNIN_WOMERSLEY,
      label: intl.formatMessage({id: 'measureMethodDurninWomersley'}),
    },
    {
      method: MeasureMethod.FROM_SCALE,
      label: intl.formatMessage({id: 'measureMethodManualScale'}),
    },
    {
      method: MeasureMethod.WEIGHT_ONLY,
      label: intl.formatMessage({id: 'measureMethodWeight'}),
    },
  ];
}
