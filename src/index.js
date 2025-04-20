// src/index.js

import express from 'express';
import dotenv from 'dotenv';
import healthRouter from './routes/v1/health.js';

dotenv.config();

const app = express();
app.use(express.json());

// Root health‑check (para Railway y probes de infraestructura)
app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

// Versioned API v1 health‑check
app.use('/api/v1/health', healthRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);

