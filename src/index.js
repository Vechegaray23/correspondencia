import express from 'express';
import dotenv from 'dotenv';
import { pool } from './db/pool.js';

dotenv.config();
const app = express();
app.use(express.json());

// Health‑check internal (Ruta raíz para Railway)
app.get('/', (_req, res) => res.json({ status: 'ok' }));

// Health‑check
app.get('/api/health', async (_, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'db_error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
