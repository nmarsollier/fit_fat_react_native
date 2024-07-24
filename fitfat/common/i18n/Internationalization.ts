import { useIntl } from 'react-intl'

export type StringResourceType =
  | 'appName'
  | 'fmmi'
  | 'freeFatMass'
  | 'googleError'
  | 'homeMeasureTitle'
  | 'homeMenuMain'
  | 'homeMenuOptions'
  | 'homeMenuProgress'
  | 'homeOptionsTitle'
  | 'homeProgressTitle'
  | 'measureAbdominal'
  | 'measureBicep'
  | 'measureCalf'
  | 'measureChest'
  | 'measureFat'
  | 'measureLowerBack'
  | 'measureMethodManualScale'
  | 'measureMethodDurninWomersley'
  | 'measureMethodJacksonPollock3'
  | 'measureMethodJacksonPollock4'
  | 'measureMethodJacksonPollock7'
  | 'measureMethodParrillo'
  | 'measureMethodWeight'
  | 'measureMidaxillary'
  | 'measureSubscapular'
  | 'measureSuprailiac'
  | 'measureThigh'
  | 'measureTricep'
  | 'measureWeight'
  | 'newMeasureDate'
  | 'newMeasureError'
  | 'newMeasureTitle'
  | 'optionsBirthDate'
  | 'optionsDisplayName'
  | 'optionsHeight'
  | 'optionsSex'
  | 'optionsSexFemale'
  | 'optionsSexMale'
  | 'optionsSystemOfMeasurement'
  | 'optionsSystemOfMeasurementMetric'
  | 'optionsSystemOfMeasurementImperial'
  | 'optionsWeight'
  | 'saveDialogTitle'
  | 'saveMyDataInCloud'
  | 'unitCm'
  | 'unitIn'
  | 'unitKg'
  | 'unitLb'
  | 'unitMm'
  | 'unitPercent'

export const messages = new Map<string, Record<StringResourceType, string>>([
  [
    'en',
    {
      appName: 'Body Fat Tracker',
      fmmi: 'FFMI',
      freeFatMass: 'Free Fat Mass',
      googleError: 'Could not connect.',

      homeMeasureTitle: 'Measures',
      homeMenuMain: 'Measure',
      homeMenuOptions: 'Options',
      homeMenuProgress: 'Progress',
      homeOptionsTitle: 'Preferences',
      homeProgressTitle: 'Your Progress',

      measureAbdominal: 'Abdominal',
      measureBicep: 'Bicep',
      measureCalf: 'Calf',
      measureChest: 'Chest',
      measureFat: 'Body Fat',
      measureLowerBack: 'Lower Back',
      measureMethodManualScale: 'Manual / Scale',
      measureMethodDurninWomersley: 'Durnin/Womersley',
      measureMethodJacksonPollock3: 'Jackson/Pollock 3',
      measureMethodJacksonPollock4: 'Jackson/Pollock 4',
      measureMethodJacksonPollock7: 'Jackson/Pollock 7',
      measureMethodParrillo: 'Parrillo',
      measureMethodWeight: 'Weight',
      measureMidaxillary: 'Midaxillary',
      measureSubscapular: 'Subscapular',
      measureSuprailiac: 'Suprailiac',
      measureThigh: 'Thigh',
      measureTricep: 'Tricep',
      measureWeight: 'Weight',

      newMeasureDate: 'Measure Date',
      newMeasureError: 'Fill all values',
      newMeasureTitle: 'Your Measure',

      optionsBirthDate: 'Birth Date',
      optionsDisplayName: 'Display Name',
      optionsHeight: 'Height',
      optionsSex: 'Sex',
      optionsSexFemale: 'Female',
      optionsSexMale: 'Male',
      optionsSystemOfMeasurement: 'System',
      optionsSystemOfMeasurementMetric: 'Metric',
      optionsSystemOfMeasurementImperial: 'Imperial',
      optionsWeight: 'Weight',

      saveDialogTitle: 'Save',
      saveMyDataInCloud: 'Save my data in cloud',

      unitCm: 'cm',
      unitIn: 'in',
      unitKg: 'kg',
      unitLb: 'lb',
      unitMm: 'mm',
      unitPercent: '%'
    }
  ],
  [
    'es',
    {
      appName: 'Control Grasa Corporal',
      fmmi: 'FFMI',
      googleError: 'Could not connect.',

      homeMenuOptions: 'Opciones',
      homeMenuProgress: 'Progreso',
      homeMenuMain: 'Medida',
      optionsSystemOfMeasurement: 'Sistema',
      optionsSystemOfMeasurementMetric: 'Métrico',
      optionsSystemOfMeasurementImperial: 'Imperial',
      optionsSex: 'Sexo',
      optionsSexMale: 'Masculino',
      optionsSexFemale: 'Femenino',
      optionsWeight: 'Peso',
      optionsHeight: 'Altura',
      optionsDisplayName: 'Su Nombre',
      optionsBirthDate: 'Fecha de nacimiento',
      measureChest: 'Pecho',
      measureAbdominal: 'Abdominal',
      measureThigh: 'Muslo',
      measureTricep: 'Tricep',
      measureSubscapular: 'Subescapular',
      measureSuprailiac: 'Suprailíaco',
      measureMidaxillary: 'Midaxilar',
      measureBicep: 'Bíceps',
      measureLowerBack: 'Espalda baja',
      measureCalf: 'Pantorrillas',
      newMeasureTitle: 'Su medida',
      saveDialogTitle: 'Guardar',
      measureFat: 'Grasa corporal',
      homeOptionsTitle: 'Preferencias',
      homeMeasureTitle: 'Medidas',
      homeProgressTitle: 'Su progreso',
      newMeasureError: 'Rellena todos los valores',

      measureMethodWeight: 'Peso',
      measureMethodManualScale: 'Manual / Balanza',
      measureMethodDurninWomersley: 'Durnin/Womersley',
      measureMethodJacksonPollock3: 'Jackson/Pollock 3',
      measureMethodJacksonPollock4: 'Jackson/Pollock 4',
      measureMethodJacksonPollock7: 'Jackson/Pollock 7',
      measureMethodParrillo: 'Parrillo',

      newMeasureDate: 'Fecha de la medida',
      measureWeight: 'Peso',
      saveMyDataInCloud: 'Guardar mis datos en la nube',
      freeFatMass: 'Grasa Libre',

      unitCm: 'cm',
      unitIn: 'in',
      unitKg: 'kg',
      unitLb: 'lb',
      unitMm: 'mm',
      unitPercent: '%'
    }
  ]
])

export function useI18n() {
  const intl = useIntl()

  return {
    formatMessage: (res: StringResourceType) => {
      return intl.formatMessage({ id: res })
    }
  }
}
