import { useI18n } from '@/common/i18n/Internationalization'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import { ImageAssets } from '../../../assets/img/ImageAsets'
import ErrorView from '../../common/components/ErrorView'
import { ColumnLayout, RowLayout } from '../../common/components/Layouts'
import LoadingView from '../../common/components/LoadingView'
import { Stretch } from '../../common/components/Stretch'
import Toolbar from '../../common/components/Toolbar'
import { displayDatetime } from '../../common/libs/DateLibs'
import { ColorSchema } from '../../common/ui/ColorSchema'
import { LabelTheme } from '../../common/ui/Themes'
import { measureWeightStringId, PreferencesData } from '../../preferences/PreferencesModel'
import { bodyFatMass, freeFatMassIndex, MeasuresData } from '../model/MeassuresModel'
import { methodStringId } from '../model/MeasureMethod'
import {
  GoNewMeasure,
  GoViewMeasure,
  MeasuresListReducer,
  MeasuresListState,
  useMeasuresListState
} from './MeasuresListState'

export default function MeasuresListScreen() {
  const { state, onEvent, reducer, preferences } = useMeasuresListState()

  useEffect(
    () =>
      onEvent((event: any) => {
        if (event === GoNewMeasure) {
          router.navigate('/measures/')
        } else if (event instanceof GoViewMeasure) {
          router.navigate('/measures/{event.uuid}')
        }
      }),
    [state]
  )

  if (!state || state.isLoading) {
    return <LoadingView />
  }

  if (state.isError) {
    return <ErrorView text="Error Loading Data" />
  }

  return <MeasuresListDetails imageState={state} reducer={reducer} preferences={preferences} />
}

function MeasuresListDetails({
  imageState,
  reducer,
  preferences
}: {
  imageState: MeasuresListState
  reducer: MeasuresListReducer
  preferences: PreferencesData | undefined
}) {
  const intl = useI18n()
  return (
    <ColumnLayout
      style={{
        backgroundColor: ColorSchema.onPrimaryVariant
      }}>
      <Toolbar>
        <Text
          variant="titleLarge"
          style={{
            color: ColorSchema.secondary
          }}>
          {intl.formatMessage('homeMeasureTitle')}
        </Text>

        <Stretch />

        <TouchableOpacity
          onPress={() => {
            reducer.openNewMeasure()
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
          margin: 8
        }}
        data={imageState.measures}
        renderItem={({ item }) => (
          <MeasureCard data={item} preferences={preferences} reducer={reducer} />
        )}
      />
    </ColumnLayout>
  )
}

function MeasureCard({
  data,
  reducer,
  preferences
}: {
  data: MeasuresData
  reducer: MeasuresListReducer
  preferences: PreferencesData | undefined
}) {
  const intl = useI18n()
  return (
    <TouchableOpacity
      onPress={() => {
        reducer.openViewMeasure(data.id)
      }}>
      <ColumnLayout
        style={{
          backgroundColor: ColorSchema.secondary,
          width: '100%'
        }}>
        <RowLayout
          style={{
            paddingTop: 8
          }}>
          <Text
            variant="bodyMedium"
            style={{
              flex: 1,
              textAlign: 'center'
            }}>
            {displayDatetime(data.date)}
          </Text>

          <Text
            variant="bodyMedium"
            style={{
              flex: 1,
              textAlign: 'center'
            }}>
            {intl.formatMessage(methodStringId(data.measureMethod))} :
          </Text>
        </RowLayout>

        <RowLayout style={{ width: '100%' }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center'
            }}>
            <Text theme={LabelTheme} variant="bodyMedium">
              {intl.formatMessage('measureWeight')} :
            </Text>
            <Text variant="bodyMedium" style={{ paddingStart: 5, paddingEnd: 3 }}>
              {data.bodyWeight}
            </Text>
            <Text theme={LabelTheme} variant="bodyMedium">
              {intl.formatMessage(measureWeightStringId(preferences?.measureSystem))}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center'
            }}>
            <Text theme={LabelTheme} variant="bodyMedium">
              {intl.formatMessage('measureFat')} :
            </Text>
            <Text variant="bodyMedium" style={{ paddingStart: 5, paddingEnd: 3 }}>
              {data.fatPercent}
            </Text>
            <Text theme={LabelTheme} variant="bodyMedium">
              %
            </Text>
          </View>
        </RowLayout>

        <RowLayout
          style={{
            paddingBottom: 8
          }}>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center'
            }}>
            <Text theme={LabelTheme} variant="bodyMedium">
              {intl.formatMessage('freeFatMass')} :
            </Text>
            <Text variant="bodyMedium" style={{ paddingStart: 5, paddingEnd: 3 }}>
              {bodyFatMass(data).toFixed(2)}
            </Text>
            <Text theme={LabelTheme} variant="bodyMedium">
              {intl.formatMessage(measureWeightStringId(preferences?.measureSystem))} :
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center'
            }}>
            <Text theme={LabelTheme} variant="bodyMedium">
              {intl.formatMessage('fmmi')} :
            </Text>
            <Text variant="bodyMedium" style={{ paddingStart: 5 }}>
              {freeFatMassIndex(data)}
            </Text>
          </View>
        </RowLayout>

        <Divider />
      </ColumnLayout>
    </TouchableOpacity>
  )
}
