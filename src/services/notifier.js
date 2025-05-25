import nodemailer from 'nodemailer';
import twilio from 'twilio';

/* ------------------------------------------------------------------ */
/* 1. MAILER – config                                                          */
/* ------------------------------------------------------------------ */
const mailer = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   +process.env.SMTP_PORT || 465,
  secure: true,                         // 465 = SSL
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
  await mailer.sendMail({
    from: '"Conserjería" <no-reply@correspondencia.local>',
    to:   email,
    subject: `Nuevo paquete #${pkg.id}`,
    text:    `Se recibió un paquete para ${pkg.destinatario}.`
  });

  // SMS opcional
  if (sms && process.env.TWILIO_FROM && process.env.USER_PHONE) {
    await sms.messages.create({
      from: process.env.TWILIO_FROM,
      to:   process.env.USER_PHONE,
      body: `Paquete #${pkg.id} recibido.`
    });
  }
}

export async function estadoActualizado(pkg, email) {
  await mailer.sendMail({
    from: '"Conserjería" <no-reply@correspondencia.local>',
    to:   email,
    subject: `Paquete #${pkg.id} – estado: ${pkg.estado}`,
    text:    `Tu paquete cambió al estado «${pkg.estado}».`
  });
  if (sms && process.env.TWILIO_FROM && process.env.USER_PHONE) {
    await sms.messages.create({
      from: process.env.TWILIO_FROM,
      to:   process.env.USER_PHONE,
      body: `Paquete #${pkg.id} → ${pkg.estado}`
    });
  }
}
