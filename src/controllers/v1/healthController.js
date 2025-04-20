// src/controllers/v1/healthController.js
// import pool from '../../db/pool.js';
import { pool } from '../../db/pool.js';


export async function getHealth(req, res) {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'db_error' });
  }
}
