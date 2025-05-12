import express from 'express';
import cors    from 'cors';

import authRouter              from './routes/v1/auth.js';
import { getHealth }           from './controllers/v1/healthController.js';
import {
  createPaquete,
  getPaquetes,
  deletePaquete
} from './controllers/v1/paqueteController.js';

const app = express();

app.use(cors());
app.use(express.json());

/* ----------  Rutas  ---------- */

// Auth
app.use('/api/v1/auth', authRouter);

// Health check
app.get('/api/v1/health', getHealth);

// Paquetes
app.get   ('/api/v1/paquetes',     getPaquetes);    // lista (opcional ?depto=101A)
app.post  ('/api/v1/paquetes',     createPaquete);  // registrar uno nuevo
app.delete('/api/v1/paquetes/:id', deletePaquete);  // eliminar / marcar entregado

export default app;
