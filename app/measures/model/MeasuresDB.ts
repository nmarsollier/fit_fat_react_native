import * as SQLite from 'expo-sqlite';


export async function initializeMeasuresDatabase() {
  const db = await SQLite.openDatabaseAsync('measures');

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
  );
}

