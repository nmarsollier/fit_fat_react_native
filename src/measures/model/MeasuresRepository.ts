import * as SQLite from 'expo-sqlite'
import { MeasuresData } from './MeassuresModel'

let db: SQLite.SQLiteDatabase | undefined

async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db

  db = await SQLite.openDatabaseAsync('measures')

  await db.execAsync(
    `
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS measures (
      id TEXT PRIMARY KEY NOT NULL, 
      date TEXT,
      bodyWeight REAL,
      bodyHeight REAL,
      age INTEGER,
      sex TEXT,
      measureMethod TEXT,
      chest INTEGER,
      abdominal INTEGER,
      thigh INTEGER,
      triceps INTEGER,
      subscapular INTEGER,
      suprailiac INTEGER,
      midaxillary INTEGER,
      bicep INTEGER,
      lowerBack INTEGER,
      calf INTEGER,
      fatPercent REAL
    );
    `
  )

  return db
}

export async function storeMeasure(measure: Readonly<MeasuresData>) {
  try {
    const db = await getDb()
    if (!db) return

    await db.runAsync(
      `INSERT INTO measures (
      id, date, bodyWeight, bodyHeight, age, sex, measureMethod, chest, abdominal, thigh, 
      triceps, subscapular, suprailiac, midaxillary, bicep, lowerBack, calf, fatPercent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      measure.id,
      measure.date,
      measure.bodyWeight,
      measure.bodyHeight,
      measure.age,
      measure.sex,
      measure.measureMethod,
      measure.chest,
      measure.abdominal,
      measure.thigh,
      measure.triceps,
      measure.subscapular,
      measure.suprailiac,
      measure.midaxillary,
      measure.bicep,
      measure.lowerBack,
      measure.calf,
      measure.fatPercent
    )
  } catch (e) {
    console.log(e)
  }
}

export async function deleteMeasure(measureId: string): Promise<void> {
  try {
    const db = await getDb()

    if (!db) return

    await db.runAsync('DELETE FROM measures WHERE id = ?', measureId)
  } catch (e) {
    console.log(e)
    return undefined
  }
}

export async function findMeasure(measureId: string): Promise<MeasuresData | undefined> {
  try {
    const db = await getDb()

    if (!db) return

    const result = await db.getFirstAsync<MeasuresData>(
      'SELECT * FROM measures WHERE id = ?',
      measureId
    )
    return result || undefined
  } catch (e) {
    console.log(e)
    return undefined
  }
}

export async function findLastMeasure(): Promise<MeasuresData | undefined> {
  try {
    const db = await getDb()

    if (!db) return

    const result = await db.getFirstAsync<MeasuresData>('SELECT * FROM measures ORDER BY date DESC')
    return result || undefined
  } catch (e) {
    console.log(e)
    return undefined
  }
}

export async function findMeasures(): Promise<MeasuresData[]> {
  try {
    const db = await getDb()

    if (!db) return []

    const result = await db.getAllAsync<MeasuresData>('SELECT * FROM measures ORDER BY date DESC')
    return result || []
  } catch (e) {
    console.log(e)
    return []
  }
}
