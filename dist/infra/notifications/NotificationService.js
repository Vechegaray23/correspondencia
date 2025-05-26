import { createTransport } from 'nodemailer';
import twilio from 'twilio';
import pRetry from 'p-retry';
/* ------------------------------------------------------------------ */
/* 1.  SMTP • createTransport                                         */
/* ------------------------------------------------------------------ */
const mailer = createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT ?? '465'),
    secure: true, // SSL directo
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
export const mailerUp = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
export const smsUp = !!(process.env.TWILIO_SID && process.env.TWILIO_TOKEN);
/* ------------------------------------------------------------------ */
/* 2.  Twilio (opcional)                                              */
/* ------------------------------------------------------------------ */
// ② Usa el flag smsUp para inicializar sms
let sms = null;
if (smsUp) {
    sms = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
}
/* ------------------------------------------------------------------ */
/* 3.  Funciones genéricas                                            */
/* ------------------------------------------------------------------ */
export async function sendEmail(to, subject, html, text) {
    await pRetry(() => mailer.sendMail({
        from: process.env.EMAIL_FROM || '"Conserjería" <no-reply@correspondencia.local>',
        to,
        subject,
        html,
        text,
    }), { retries: 3 });
}
export async function sendSMS(to, body) {
    if (!sms || !process.env.TWILIO_FROM)
        return; // SMS deshabilitado
    await pRetry(() => sms.messages.create({
        from: process.env.TWILIO_FROM,
        to,
        body,
    }), { retries: 3 });
}
/* ------------------------------------------------------------------ */
/* 4.  Casos de uso de negocio                                        */
/* ------------------------------------------------------------------ */
export async function nuevoPaquete(pkg, email) {
    const texto = `Se recibió un paquete para ${pkg.destinatario}.`;
    await sendEmail(email, `Nuevo paquete #${pkg.id}`, undefined, texto);
    if (process.env.USER_PHONE) {
        await sendSMS(process.env.USER_PHONE, `Paquete #${pkg.id} recibido.`);
    }
}
export async function estadoActualizado(pkg, email) {
    const texto = `Tu paquete cambió al estado «${pkg.estado}».`;
    await sendEmail(email, `Paquete #${pkg.id} – estado: ${pkg.estado}`, undefined, texto);
    if (process.env.USER_PHONE) {
        await sendSMS(process.env.USER_PHONE, `Paquete #${pkg.id} → ${pkg.estado}`);
    }
}
