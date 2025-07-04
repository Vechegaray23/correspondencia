import { Router } from 'express';
import pool from '../../db/pool.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'reemplaza_en_prod';
/* ---------- POST /api/v1/auth/login ---------- */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Sólo seleccionamos las columnas que realmente existen
        const { rows } = await pool.query(`SELECT id, password, role, depto
         FROM usuarios
        WHERE username = $1`, [username]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
        // Generamos un token con id y role
        const token = jwt.sign({ id: user.id, role: user.role, depto: user.depto }, JWT_SECRET, { expiresIn: '2h' });
        // Devolvemos solo lo necesario
        res.json({ token, role: user.role, depto: user.depto });
    }
    catch (err) {
        console.error('Auth error:', err);
        res.status(500).json({ error: 'Error interno' });
    }
});
export default router;
