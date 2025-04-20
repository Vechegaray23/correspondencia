// src/routes/v1/health.js
import { Router } from 'express';
import { getHealth } from '../../controllers/v1/healthController.js';

const router = Router();

// GET /api/v1/health
router.get('/', getHealth);

export default router;
