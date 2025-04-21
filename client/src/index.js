import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import healthRouter from './routes/v1/health.js';
import paquetesRouter from './routes/v1/paquetes.js';
import path from 'path';
import 'bootstrap/dist/css/bootstrap.min.css';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/v1/health', healthRouter);
app.post('/api/v1/paquetes', paquetesRouter);

// SERVIR FRONTEND
app.use(express.static(path.join(process.cwd(), 'client/dist')));
app.get('*', (_req, res) => {
  res.sendFile(path.join(process.cwd(), 'client/dist', 'index.html'));
});

export default app;