/* src/index.js */
import express from 'express';
import cors    from 'cors';

import authRouter              from './routes/v1/auth.js';
import { getHealth }           from './controllers/v1/healthController.js';
import {
  createPaquete,
  getPaquetes,
  deletePaquete,
  updatePaqueteEstado
} from './controllers/v1/paqueteController.js';

import { Router } from 'express';

const app = express();
const debugRouter = Router();

// ☆ DEBUG endpoint to inspect active SQL queries
// Call GET /api/v1/_debug/pkg-sql
debugRouter.get('/_debug/pkg-sql', (req, res) => {
  res.json({
    createQuery: `INSERT INTO paquetes (depto, receptor, destinatario, comentarios, urgencia) VALUES ($1, $2, $3, $4, $5) RETURNING id, destinatario, estado`,
    userLookup: `SELECT mail AS email, phone FROM usuarios WHERE depto = $1`,
  });
});

app.use(cors());
app.use(express.json());

/* ----------  Rutas  ---------- */

// Debug routes (must be before other /api/v1 routes)
app.use('/api/v1', debugRouter);

// Auth
app.use('/api/v1/auth', authRouter);

// Health check
app.get('/api/v1/health', getHealth);

// Paquetes
app.get   ('/api/v1/paquetes',     getPaquetes);              // lista (opcional ?depto=101A)
app.post  ('/api/v1/paquetes',     createPaquete);            // registrar uno nuevo
app.delete('/api/v1/paquetes/:id', deletePaquete);            // eliminar / marcar entregado
app.patch ('/api/v1/paquetes/:id/estado', updatePaqueteEstado); // actualizar estado

export default app;