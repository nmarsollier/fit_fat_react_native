import { IcDelete, IcNew } from '@/assets/svg'
import ErrorView from '@/src/common/components/ErrorView'
import { ColumnLayout, RowLayout } from '@/src/common/components/Layouts'
import LoadingView from '@/src/common/components/LoadingView'
import Toolbar from '@/src/common/components/Toolbar'
import { displayDateTime } from '@/src/common/libs/DateLibs'
import { ColorSchema } from '@/src/common/ui/ColorSchema'
import { LabelTheme } from '@/src/common/ui/Themes'
import { useLocalization } from '@/src/localization/useLocalization'
import { preferencesStore } from '@/src/preferences/PreferencesStore'
import { router, useFocusEffect } from 'expo-router'
import React, { useEffect } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { Divider, FAB, Text } from 'react-native-paper'
import { measureWeightStringId, PreferencesData } from '../../preferences/PreferencesModel'
import { bodyFatMass, freeFatMassIndex, MeasuresData } from '../model/MeassuresModel'
import { methodStringId } from '../model/MeasureMethod'
import {
  GoNewMeasure,
  GoViewMeasure,
  MeasuresListReducer,
  MeasuresListState,
  onMeasureListEvent,
  useMeasuresListSore
} from './MeasuresListStore'

export default function MeasuresListScreen() {
  const { state, reducer } = useMeasuresListSore()((state) => state)
  const preferences = preferencesStore((state) => state.state.preferences)
  const localize = useLocalization()

  useEffect(() => {
    onMeasureListEvent((event: any) => {
      if (event instanceof GoNewMeasure) {
        router.navigate('/measures/')
      } else if (event instanceof GoViewMeasure) {
        router.navigate(`/measures/${event.uuid}`)
      }
    })
  }, [])

  useEffect(() => {
    void reducer.loadMeasures()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      void reducer.loadMeasures()
      return () => {}
    }, [])
  )

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
          backgroundColor: ColorSchema.background,
          justifyContent: 'center',
          alignItems: 'center',
          width: 80,
          height: '100%'
        }}>
        <IcDelete width={32} height={32} color={ColorSchema.error} />
      </TouchableOpacity>
    )
  }

  return (
    <ColumnLayout
      style={{
        backgroundColor: ColorSchema.background
      }}>
      <Toolbar>
        <Text
          variant="titleLarge"
          style={{
            color: ColorSchema.secondary
          }}>
          {localize('homeMeasureTitle')}
        </Text>
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

      <FAB
        style={{
          position: 'absolute',
          borderRadius: 28,
          padding: 0,
          right: 16,
          bottom: 16,
          backgroundColor: ColorSchema.onSecondary
        }}
        icon={({ size }) => <IcNew width={size} height={size} color={ColorSchema.secondary} />}
        onPress={() => {
          reducer.openNewMeasure()
        }}
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
          paddingHorizontal: 8,
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
            {displayDateTime(data.date)}
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
              {localize('unitPercent')}
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
