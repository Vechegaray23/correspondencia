// src/index.js

import express from 'express';
import dotenv from 'dotenv';
import healthRouter from './routes/v1/health.js';

dotenv.config();

const app = express();
app.use(express.json());

// Ruta raíz para probes de infraestructura (Railway, load‑balancers, etc.)
app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

// API versionada v1: health‑check
app.use('/api/v1/health', healthRouter);

export default app;




