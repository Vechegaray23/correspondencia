// src/initDb.js
import pool from './db/pool.js';

export async function initDb() {
  await pool.query(
    "CREATE TABLE IF NOT EXISTS paquetes (" +
    "id SERIAL PRIMARY KEY, " +
    "depto TEXT NOT NULL, " +
    "fecha_ingreso TIMESTAMP NOT NULL DEFAULT now(), " +
    "estado TEXT NOT NULL DEFAULT 'pendiente'" +
    ");"
  );
}