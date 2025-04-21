import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/v1/health.js';
import paquetesRouter from './routes/v1/paquetes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/v1/health', healthRouter);
app.use('/api/v1/paquetes', paquetesRouter);

export default app;
