import pool from '../../db/pool.js';
import { nuevoPaquete, estadoActualizado, } from '../../infra/notifications/NotificationService';
/* ------------------------------------------------------------------ */
/* 1. Crear paquete (con notificación)                                */
/* ------------------------------------------------------------------ */
export async function createPaquete(req, res) {
    const { depto, receptor, destinatario, comentarios, urgencia, email, // ← asegúrate de enviarlo en el body
     } = req.body;
    const isUrgente = urgencia?.toLowerCase() === 'alta';
    try {
        const { rows } = await pool.query(`INSERT INTO paquetes
         (depto, receptor, destinatario, comentarios, urgencia)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id,
                 depto,
                 receptor,
                 destinatario,
                 comentarios,
                 urgencia,
                 fecha_ingreso,
                 estado`, [depto, receptor, destinatario, comentarios, isUrgente]);
        const pkg = rows[0];
        /* ---------------- Enviar notificaciones (no bloquea respuesta) */
        if (email) {
            nuevoPaquete({ id: pkg.id, destinatario: pkg.destinatario }, email).catch(err => console.error('Error al enviar notificación nuevoPaquete:', err));
        }
        res.status(201).json(pkg);
    }
    catch (err) {
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
            ? await pool.query(`${baseSelect} WHERE depto = $1 ORDER BY fecha_ingreso DESC`, [depto])
            : await pool.query(`${baseSelect} ORDER BY fecha_ingreso DESC`);
        res.json(rows);
    }
    catch (err) {
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
    }
    catch (err) {
        console.error('Error al eliminar paquete:', err);
        res.status(500).json({ error: 'Error al eliminar paquete' });
    }
}
/* ------------------------------------------------------------------ */
/* 4. Cambiar estado de un paquete                                    */
/* ------------------------------------------------------------------ */
export async function updatePaqueteEstado(req, res) {
    const { id } = req.params; // /api/v1/paquetes/:id/estado
    const { estado, email } = req.body; // nuevo estado + e-mail destino
    try {
        const { rows } = await pool.query(`UPDATE paquetes
          SET estado = $1
        WHERE id     = $2
      RETURNING id, destinatario, estado`, [estado, id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }
        const pkg = rows[0];
        /* -------- Notificar (no bloquea respuesta) ------------------- */
        if (email) {
            estadoActualizado({ id: pkg.id, estado: pkg.estado }, email).catch(err => console.error('Error al enviar notificación estadoActualizado:', err));
        }
        res.json(pkg);
    }
    catch (err) {
        console.error('Error al actualizar paquete:', err);
        res.status(500).json({ error: 'Error al actualizar paquete' });
    }
}
