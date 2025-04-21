import { Router } from 'express';
import { createPaquete } from '../../controllers/v1/paqueteController.js';

const router = Router();

// POST /api/v1/paquetes
router.post('/', createPaquete);

export default router;
