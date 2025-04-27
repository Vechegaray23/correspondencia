// src/controllers/v1/paqueteController.js
import pool from '../../db/pool.js';

export async function createPaquete(req, res) {
  try {
    const { depto } = req.body;
    const result = await pool.query(
      'INSERT INTO paquetes (depto) VALUES ($1) RETURNING id, depto, fecha_ingreso, estado',
      [depto]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear paquete:', err);
    res.status(500).json({ error: err.message });
  }
}

export async function getPaquetes(req, res) {
  try {
    const { rows } = await pool.query(
      'SELECT id, depto, fecha_ingreso, estado FROM paquetes ORDER BY id DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error al listar paquetes:', err);
    res.status(500).json({ error: 'Error al listar paquetes' });
  }
}

export async function deletePaquete(req, res) {
  const { id } = req.params;
  try {
    await pool.query(
        'DELETE FROM paquetes WHERE id = $1',
        [id]
      );
    res.json({ success: true });
    } catch (err) {
      console.error('Error al eliminar paquete:', err);
      res.status(500).json({ error: 'Error al eliminar paquete' });
    }
}