import 'dotenv/config';
import { nuevoPaquete } from '../dist/infra/notifications/NotificationService.js';

(async () => {
  try {
    await nuevoPaquete({ id: 999, destinatario: 'Prueba CLI' }, process.env.SMTP_USER);
    console.log('✔ Correo + SMS enviados');
    process.exit(0);
  } catch (err) {
    console.error('✖ Falló el envío:', err);
    process.exit(1);
  }
})();