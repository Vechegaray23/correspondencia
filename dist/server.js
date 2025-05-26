// src/server.js
import 'dotenv/config';
import app from './index.js';
import { initDb } from './initDb.js';
const PORT = process.env.PORT || 3000;
initDb()
    .then(() => {
    console.log('✅ Base de datos inicializada');
    app.listen(PORT, () => {
        console.log('API corriendo en http://localhost:' + PORT);
    });
})
    .catch((err) => {
    console.error('❌ Error al inicializar la BD:', err);
    process.exit(1);
});
