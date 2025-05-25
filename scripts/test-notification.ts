import 'dotenv/config';
import { nuevoPaquete } from '../src/infra/notifications/NotificationService.ts';

(async () => {
  await nuevoPaquete(
    { id: 999, destinatario: 'Prueba CLI' },
    process.env.SMTP_USER!
  );
  console.log('✔ Correo + SMS enviados');
})().catch(err => {
  console.error('✖ Falló:', err);
  process.exit(1);
});