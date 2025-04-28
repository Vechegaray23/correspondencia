import pool from '../../db/pool.js';

// Crea un paquete, ya con los nuevos campos
export async function createPaquete(req, res) {
  const { depto, receptor, destinatario, comentarios, urgencia } = req.body;

  try {
    const { rows } = await pool.query(
      `INSERT INTO paquetes
         (depto, receptor, destinatario, comentarios, urgencia)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING
         id,
         depto,
         receptor,
         destinatario,
         comentarios,
         urgencia,
         fecha_ingreso,
         estado`,
      [depto, receptor, destinatario, comentarios, urgencia]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error al crear paquete:', err);
    res.status(500).json({ error: 'Error al crear paquete' });
  }
}

// Devuelve todos los paquetes con los nuevos campos
export async function getPaquetes(req, res) {
  try {
    const { rows } = await pool.query(
      `SELECT
         id,
         depto,
         receptor,
         destinatario,
         comentarios,
         urgencia,
         fecha_ingreso,
         estado
       FROM paquetes
       ORDER BY id DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Error al listar paquetes:', err);
    res.status(500).json({ error: 'Error al listar paquetes' });
  }
}

// Elimina un paquete por id
export async function deletePaquete(req, res) {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM paquetes WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error al eliminar paquete:', err);
    res.status(500).json({ error: 'Error al eliminar paquete' });
  }
}
