import 'dotenv/config';
import * as notifier from '../src/services/notifier.js';

/* ----------------------------------------------------------
   Enviará un correo (y SMS si Twilio está configurado) a
   EMAIL_USER definido en .env
---------------------------------------------------------- */
await notifier.nuevoPaquete(
  { id: 999, destinatario: 'Prueba CLI' },
  process.env.SMTP_USER
).then(() => {
  console.log('✔ Correo de prueba enviado');
  process.exit(0);
}).catch(err => {
  console.error('✖ Falló el envío:', err);
  process.exit(1);
});
