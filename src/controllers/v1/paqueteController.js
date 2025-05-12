import pool from '../../db/pool.js';

/* ------------------------------------------------------------------ */
/* 1. Crear paquete (con los nuevos campos)                            */
/* ------------------------------------------------------------------ */
export async function createPaquete(req, res) {
  const { depto, receptor, destinatario, comentarios, urgencia } = req.body;

  try {
    const { rows } = await pool.query(
      `INSERT INTO paquetes
         (depto, receptor, destinatario, comentarios, urgencia)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id,
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

/* ------------------------------------------------------------------ */
/* 2. Listar paquetes (global o filtrado por depto)                    */
/* ------------------------------------------------------------------ */
export async function getPaquetes(req, res) {
  const { depto } = req.query; // ej. /api/v1/paquetes?depto=101A

  try {
    const baseSelect = `
      SELECT id,
             depto,
             receptor,
             destinatario,
             comentarios,
             urgencia,
             estado,
             fecha_ingreso
        FROM paquetes`;

    const { rows } = depto
      ? await pool.query(
          `${baseSelect} WHERE depto = $1 ORDER BY fecha_ingreso DESC`,
          [depto]
        )
      : await pool.query(`${baseSelect} ORDER BY fecha_ingreso DESC`);

    res.json(rows);
  } catch (err) {
    console.error('Error al listar paquetes:', err);
    res.status(500).json({ error: 'Error al listar paquetes' });
  }
}

/* ------------------------------------------------------------------ */
/* 3. Eliminar paquete por ID                                         */
/* ------------------------------------------------------------------ */
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