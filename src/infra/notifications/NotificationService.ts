import { createTransport } from 'nodemailer';
import twilio from 'twilio';
import pRetry from 'p-retry';

/* ------------------------------------------------------------------ */
/* 1.  SMTP • createTransport                                         */
/* ------------------------------------------------------------------ */
const mailer = createTransport({
  host:   process.env.SMTP_HOST ?? 'smtp.gmail.com',
  port:   Number(process.env.SMTP_PORT ?? '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const mailerUp = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
export const smsUp    = !!(process.env.TWILIO_SID && process.env.TWILIO_TOKEN && process.env.TWILIO_FROM);

/* ------------------------------------------------------------------ */
/* 2.  Twilio (opcional)                                              */
/* ------------------------------------------------------------------ */
let sms: ReturnType<typeof twilio> | null = null;
if (smsUp) {
  sms = twilio(process.env.TWILIO_SID!, process.env.TWILIO_TOKEN!);
}

/* ------------------------------------------------------------------ */
/* 3.  Funciones genéricas                                            */
/* ------------------------------------------------------------------ */
export async function sendEmail(
  to: string,
  subject: string,
  html?: string,
  text?: string,
) {
  await pRetry(
    () =>
      mailer.sendMail({
        from: process.env.EMAIL_FROM || '"Conserjería" <no-reply@correspondencia.local>',
        to,
        subject,
        html,
        text,
      }),
    { retries: 3 },
  );
}

export async function sendSMS(to: string, body: string) {
  if (!sms) return;
  await pRetry(
    () =>
      sms!.messages.create({
        from: process.env.TWILIO_FROM!,
        to,
        body,
      }),
    { retries: 3 },
  );
}

/* ------------------------------------------------------------------ */
/* 4.  Casos de uso de negocio                                        */
/* ------------------------------------------------------------------ */
export async function nuevoPaquete(
  pkg: { id: number; destinatario: string; phone?: string; qr?: string },
    email: string,
) {
  const texto = `Se recibió un paquete para ${pkg.destinatario}.`;
  const html = pkg.qr
    ? `<p>${texto}</p><img src="${pkg.qr}" alt="QR del paquete" />`
    : undefined;
  await sendEmail(email, `Nuevo paquete #${pkg.id}`, html, texto);
    if (sms && pkg.phone) {
    await sendSMS(pkg.phone, `Paquete #${pkg.id} recibido.`);
  }
}

export async function estadoActualizado(
  pkg: { id: number; estado: string; phone?: string },
  email: string,
) {
  const texto = `Tu paquete cambió al estado «${pkg.estado}».`;
  await sendEmail(email, `Paquete #${pkg.id} – estado: ${pkg.estado}`, undefined, texto);
  if (sms && pkg.phone) {
    await sendSMS(pkg.phone, `Paquete #${pkg.id} → ${pkg.estado}`);
  }
}