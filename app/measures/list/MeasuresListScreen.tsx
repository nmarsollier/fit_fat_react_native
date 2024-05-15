import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import ErrorView from '../../common/components/ErrorView';
import { ColumnLayout, RowLayout } from '../../common/components/Layouts';
import LoadingView from '../../common/components/LoadingView';
import { Stretch } from '../../common/components/Stretch';
import Toolbar from '../../common/components/Toolbar';
import { displayDatetime } from '../../common/libs/DateLibs';
import { RootStackParamList } from '../../common/navigation/Navigation';
import { ColorSchema } from '../../common/ui/ColorSchema';
import { ImageAssets } from '../../common/ui/ImageAsets';
import { LabelTheme } from '../../common/ui/Themes';
import {
  measureMessageId,
  PreferencesData,
} from '../../preferences/PreferencesModel';
import {
  bodyFatMass,
  freeFatMassIndex,
  MeasuresData,
  methodMessageId,
} from '../model/MeassuresModel';
import {
  GoNewMeasure,
  GoViewMeasure,
  MeasuresListReducer,
  MeasuresListState,
  useMeasuresListState,
} from './MeasuresListState';

export default function MeasuresListScreen(
  props: NativeStackScreenProps<RootStackParamList>,
) {
  const { state, onEvent, reducer, preferences } = useMeasuresListState();

  useEffect(
    () =>
      onEvent((event: any) => {
        if (event === GoNewMeasure) {
          props.navigation.navigate('EditMeasureScreen', {
            measureId: undefined,
          });
        } else if (event instanceof GoViewMeasure) {
          props.navigation.navigate('EditMeasureScreen', {
            measureId: event.uuid,
          });
        }
      }),
    [],
  );

  if (!state || state.isLoading) {
    return <LoadingView />;
  }

  if (state.isError) {
    return <ErrorView text="Error Loading Data" />;
  }

  return (
    <MeasuresListDetails
      imageState={state}
      reducer={reducer}
      preferences={preferences}
    />
  );
}

function MeasuresListDetails(props: {
  imageState: MeasuresListState;
  reducer: MeasuresListReducer;
  preferences: PreferencesData | undefined;
}) {
  return (
    <ColumnLayout
      style={{
        backgroundColor: ColorSchema.onPrimaryVariant,
      }}>
      <Toolbar>
        <Text
          variant="titleLarge"
          style={{
            color: ColorSchema.secondary,
          }}>
          <FormattedMessage id="homeMeasureTitle" />
        </Text>

        <Stretch />

        <TouchableOpacity
          onPress={() => {
            props.reducer.openNewMeasure();
          }}>
          <Image
            source={ImageAssets.new}
            style={{ height: 16, width: 16, marginEnd: 16 }}
            tintColor={ColorSchema.secondary}
          />
        </TouchableOpacity>
      </Toolbar>

      <FlatList
        style={{
          margin: 8,
        }}
        data={props.imageState.measures}
        renderItem={({ item }) => (
          <MeasureCard
            data={item}
            preferences={props.preferences}
            reducer={props.reducer}
          />
        )}
      />
    </ColumnLayout>
  );
}

function MeasureCard(props: {
  data: MeasuresData;
  reducer: MeasuresListReducer;
  preferences: PreferencesData | undefined;
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.reducer.openViewMeasure(props.data.uid);
      }}>
      <ColumnLayout
        style={{
          backgroundColor: ColorSchema.secondary,
          width: '100%',
        }}>
        <RowLayout
          style={{
            paddingTop: 8,
          }}>
          <Text
            variant="bodyMedium"
            style={{
              flex: 1,
              textAlign: 'center',
            }}>
            {displayDatetime(props.data.date)}
          </Text>

          <Text
            variant="bodyMedium"
            style={{
              flex: 1,
              textAlign: 'center',
            }}>
            <FormattedMessage id={methodMessageId(props.data.measureMethod)} />
          </Text>
        </RowLayout>

        <RowLayout style={{ width: '100%' }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text theme={LabelTheme} variant="bodyMedium">
              <FormattedMessage id="measureWeight" /> :
            </Text>
            <Text
              variant="bodyMedium"
              style={{ paddingStart: 5, paddingEnd: 3 }}>
              {props.data.bodyWeight}
            </Text>
            <Text theme={LabelTheme} variant="bodyMedium">
              <FormattedMessage
                id={measureMessageId(props.preferences?.measureSystem)}
              />
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text theme={LabelTheme} variant="bodyMedium">
              <FormattedMessage id="measureFat" /> :
            </Text>
            <Text
              variant="bodyMedium"
              style={{ paddingStart: 5, paddingEnd: 3 }}>
              {props.data.fatPercent}
            </Text>
            <Text theme={LabelTheme} variant="bodyMedium">
              %
            </Text>
          </View>
        </RowLayout>

        <RowLayout
          style={{
            paddingBottom: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text theme={LabelTheme} variant="bodyMedium">
              <FormattedMessage id="freeFatMass" /> :
            </Text>
            <Text
              variant="bodyMedium"
              style={{ paddingStart: 5, paddingEnd: 3 }}>
              {bodyFatMass(props.data).toFixed(2)}
            </Text>
            <Text theme={LabelTheme} variant="bodyMedium">
              <FormattedMessage
                id={measureMessageId(props.preferences?.measureSystem)}
              />
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text theme={LabelTheme} variant="bodyMedium">
              <FormattedMessage id="fmmi" /> :
            </Text>
            <Text variant="bodyMedium" style={{ paddingStart: 5 }}>
              {freeFatMassIndex(props.data)}
            </Text>
          </View>
        </RowLayout>

        <Divider />
      </ColumnLayout>
    </TouchableOpacity>
  );
}
