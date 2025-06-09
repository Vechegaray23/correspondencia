import pool from '../../db/pool.js';
import { nuevoPaquete, estadoActualizado, } from '../../infra/notifications/NotificationService.js';
/* ------------------------------------------------------------------ */
/* 1. Crear paquete (notifica al residente si existe)                 */
/* ------------------------------------------------------------------ */
export async function createPaquete(req, res) {
    const { depto, receptor, destinatario, comentarios, urgencia } = req.body;
    try {
        /* 1️⃣ – Buscar residente dueño del depto */
        const { rows: userRows } = await pool.query(`SELECT email, phone FROM usuarios WHERE depto = $1`, [depto]);
        if (!userRows.length) {
            return res.status(400).json({ error: `No existe residente para depto ${depto}` });
        }
        const { email, phone } = userRows[0];
        /* 2️⃣ – Insertar paquete */
        const { rows: pkgRows } = await pool.query(`INSERT INTO paquetes
         (depto, receptor, destinatario, comentarios, urgencia)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, destinatario, estado`, [depto, receptor, destinatario, comentarios, urgencia]);
        const pkg = pkgRows[0];
        /* 3️⃣ – Responder inmediatamente */
        res.status(201).json(pkg);
        /* 4️⃣ – Notificación asíncrona (no corta la respuesta) */
        nuevoPaquete({ id: pkg.id, destinatario: pkg.destinatario, phone }, email)
            .catch(err => console.error('notif nuevoPaquete:', err.message));
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
    const { depto } = req.query;
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
    const { id } = req.params;
    const { estado } = req.body;
    try {
        const { rows } = await pool.query(`UPDATE paquetes
          SET estado = $1
        WHERE id     = $2
      RETURNING id, destinatario, estado, depto`, [estado, id]);
        if (!rows.length) {
            return res.status(404).json({ error: 'Paquete no encontrado' });
        }
        const pkg = rows[0];
        res.json(pkg); // respondemos primero
        /* Notificar después */
        const { rows: userRows } = await pool.query(`SELECT email, phone FROM usuarios WHERE depto = $1`, [pkg.depto]);
        if (userRows.length) {
            const { email, phone } = userRows[0];
            estadoActualizado({ id: pkg.id, estado: pkg.estado, phone }, email)
                .catch(err => console.error('notif estadoActualizado:', err.message));
        }
    }
    catch (err) {
        console.error('Error al actualizar paquete:', err);
        res.status(500).json({ error: 'Error al actualizar paquete' });
    }
}
