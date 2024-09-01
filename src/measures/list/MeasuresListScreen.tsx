import ErrorView from '@/src/common/components/ErrorView'
import { ColumnLayout, RowLayout } from '@/src/common/components/Layouts'
import LoadingView from '@/src/common/components/LoadingView'
import { Stretch } from '@/src/common/components/Stretch'
import Toolbar from '@/src/common/components/Toolbar'
import { displayDatetime } from '@/src/common/libs/DateLibs'
import { ColorSchema } from '@/src/common/ui/ColorSchema'
import { LabelTheme } from '@/src/common/ui/Themes'
import { useLocalization } from '@/src/localization/useLocalization'
import { preferencesStore } from '@/src/preferences/PreferencesStore'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Divider, Text } from 'react-native-paper'
import { ImageAssets } from '../../../assets/img/ImageAsets'
import { measureWeightStringId, PreferencesData } from '../../preferences/PreferencesModel'
import { bodyFatMass, freeFatMassIndex, MeasuresData } from '../model/MeassuresModel'
import { methodStringId } from '../model/MeasureMethod'
import {
  GoNewMeasure,
  GoViewMeasure,
  MeasuresListReducer,
  MeasuresListState,
  useMeasuresListSore
} from './MeasuresListStore'

export default function MeasuresListScreen() {
  const { state, onEvent, reducer } = useMeasuresListSore()((state) => state)
  const preferences = preferencesStore((state) => state.state.preferences)
  const localize = useLocalization()

  useEffect(
    () =>
      onEvent((event: any) => {
        if (event instanceof GoNewMeasure) {
          router.navigate('/measures/')
        } else if (event instanceof GoViewMeasure) {
          router.navigate(`/measures/${event.uuid}`)
        }
      }),
    [onEvent]
  )

  useEffect(() => {
    void reducer.loadMeasures()
  }, [])

  if (!state || state.isLoading) {
    return <LoadingView />
  }

  if (state.isError) {
    return <ErrorView text={localize('errorLoading')} />
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
  const localize = useLocalization()

  const renderRightActions = (id: string) => {
    return (
      <TouchableOpacity
        onPress={() => {
          reducer.deleteMeasure(id)
        }}
        style={{
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          width: 80,
          height: '100%'
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold'
          }}>
          {localize('delete')}
        </Text>
      </TouchableOpacity>
    )
  }

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
          {localize('homeMeasureTitle')}
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
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <MeasureCard data={item} preferences={preferences} reducer={reducer} />
          </Swipeable>
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
  const localize = useLocalization()
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
            {localize(methodStringId(data.measureMethod))} :
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
              {localize('measureWeight')} :
            </Text>
            <Text variant="bodyMedium" style={{ paddingStart: 5, paddingEnd: 3 }}>
              {data.bodyWeight}
            </Text>
            <Text theme={LabelTheme} variant="bodyMedium">
              {localize(measureWeightStringId(preferences?.measureSystem))}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center'
            }}>
            <Text theme={LabelTheme} variant="bodyMedium">
              {localize('measureFat')} :
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
              {localize('freeFatMass')} :
            </Text>
            <Text variant="bodyMedium" style={{ paddingStart: 5, paddingEnd: 3 }}>
              {bodyFatMass(data).toFixed(2)}
            </Text>
            <Text theme={LabelTheme} variant="bodyMedium">
              {localize(measureWeightStringId(preferences?.measureSystem))} :
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'center'
            }}>
            <Text theme={LabelTheme} variant="bodyMedium">
              {localize('fmmi')} :
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
