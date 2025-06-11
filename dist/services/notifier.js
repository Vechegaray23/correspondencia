import nodemailer from 'nodemailer';
import twilio from 'twilio';
/* ------------------------------------------------------------------ */
/* 1. MAILER – config                                                          */
/* ------------------------------------------------------------------ */
const mailer = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT || 465,
    secure: true, // 465 = SSL
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
/* ------------------------------------------------------------------ */
/* 2. TWILIO – config (opcional)                                      */
/* ------------------------------------------------------------------ */
let sms = null;
if (process.env.TWILIO_SID && process.env.TWILIO_TOKEN) {
    sms = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
}
/* ------------------------------------------------------------------ */
/* 3. FUNCIONES EXPORTADAS                                            */
/* ------------------------------------------------------------------ */
export async function nuevoPaquete(pkg, email) {
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
    await mailer.sendMail({
        from: '"Conserjería" <no-reply@correspondencia.local>',
        to: email,
        subject: `Nuevo paquete #${pkg.id}`,
        text: `Se recibió un paquete para ${pkg.destinatario}.`,
        html
    });
    // SMS opcional
    if (sms && process.env.TWILIO_FROM && process.env.USER_PHONE) {
        await sms.messages.create({
            from: process.env.TWILIO_FROM,
            to: process.env.USER_PHONE,
            body: `Paquete #${pkg.id} recibido.`
        });
    }
}
export async function estadoActualizado(pkg, email) {
    await mailer.sendMail({
        from: '"Conserjería" <no-reply@correspondencia.local>',
        to: email,
        subject: `Paquete #${pkg.id} – estado: ${pkg.estado}`,
        text: `Tu paquete cambió al estado «${pkg.estado}».`
    });
    if (sms && process.env.TWILIO_FROM && process.env.USER_PHONE) {
        await sms.messages.create({
            from: process.env.TWILIO_FROM,
            to: process.env.USER_PHONE,
            body: `Paquete #${pkg.id} → ${pkg.estado}`
        });
    }
}
