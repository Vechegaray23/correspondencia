// src/server.js
import 'dotenv/config';
import app from './index.js';
import { initDb } from './initDb.js';

const PORT = process.env.PORT || 3000;

// Primero creamos la tabla si no existe, y sólo entonces levantamos Express
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Fallo al inicializar la BD:', err);
    process.exit(1);
  });