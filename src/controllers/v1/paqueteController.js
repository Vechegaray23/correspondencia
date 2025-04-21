import pool from '../../db/pool.js';

/**
 * POST /api/v1/paquetes
 * Body: { depto: string }
 */
export async function createPaquete(req, res) {
  const { depto } = req.body;
  if (!depto || typeof depto !== 'string') {
    return res
      .status(400)
      .json({ error: 'El campo "depto" es obligatorio y debe ser una cadena.' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO paquetes (depto) VALUES ($1)
       RETURNING id, depto, fecha_ingreso, estado`,
      [depto.trim()]
    );
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear paquete:', err);
    return res
      .status(500)
      .json({ error: 'Error interno al registrar paquete.' });
  }
}
