import { Router } from 'express';
import {
  createPaquete,
  getPaquetes,
  updatePaqueteEstado,          // ← nuevo handler
} from '../../controllers/v1/paqueteController.js';

const router = Router();

/* ─────────── Rutas paquetes ─────────── */
router.post('/', createPaquete);                // Crear
router.get('/',  getPaquetes);                  // Listar
router.patch('/:id/estado', updatePaqueteEstado); // Cambiar estado

export default router;