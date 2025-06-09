import 'dotenv/config';
import { nuevoPaquete } from '../dist/infra/notifications/NotificationService.js';

const phoneDemo = process.env.USER_PHONE;           // ← tu teléfono demo
const emailDemo = process.env.SMTP_USER;    // ← usa SMTP_USER

await nuevoPaquete(
  { id: 999, destinatario: 'Prueba CLI', phone: phoneDemo },
  emailDemo
).then(() => {
  console.log('✔ Correo y SMS de prueba enviados');
  process.exit(0);
}).catch(err => {
  console.error('✖ Falló el envío:', err);
  process.exit(1);
});