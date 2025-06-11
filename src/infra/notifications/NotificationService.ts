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
    ? `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Nuevo paquete</title>
  <style>
    @media screen { .btn-primary:hover { background-color:#59c2ff !important; } }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#e8f7ff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#e8f7ff;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:8px;box-shadow:0 4px 12px rgba(8,59,102,.12);overflow:hidden;">
          <tr>
            <td style="background:#0d6efd;padding:32px 24px;text-align:center;">
              <h1 style="margin:0;font-family:Segoe UI,Helvetica,Arial,sans-serif;font-size:28px;line-height:1.2;color:#ffffff;">Nuevo paquete #${pkg.id}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 24px;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#083b66;font-size:16px;line-height:1.5;">
              <p style="margin-top:0">Se recibió un paquete para <strong>${pkg.destinatario}</strong>.</p>
              <p style="margin-bottom:32px">Presenta el siguiente código QR al retirarlo:</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <img src="${pkg.qr}" width="180" height="180" alt="Código QR" style="display:block;border:0;outline:none;text-decoration:none;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 24px 32px;">
              <a href="https://misitio.cl/paquetes/${pkg.id}" class="btn-primary" style="background:#0d6efd;border-radius:6px;color:#ffffff;display:inline-block;font-family:Segoe UI,Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;line-height:44px;text-align:center;text-decoration:none;width:240px;">Ver estado</a>
            </td>
          </tr>
          <tr>
            <td style="background:#b9e4ff;padding:16px 24px;text-align:center;font-family:Segoe UI,Helvetica,Arial,sans-serif;font-size:12px;color:#083b66;">
              <p style="margin:0;">Este mensaje fue enviado automáticamente por MiSitio&nbsp;·&nbsp;<a href="https://misitio.cl" style="color:#083b66;text-decoration:underline;">www.misitio.cl</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
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