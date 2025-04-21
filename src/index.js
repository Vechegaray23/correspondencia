// src/index.js
import express from 'express';
import cors from 'cors';
import { getHealth } from './controllers/v1/healthController.js';
import { createPaquete } from './controllers/v1/paqueteController.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.get('/api/v1/health', getHealth);
app.post('/api/v1/paquetes', createPaquete);

export default app;