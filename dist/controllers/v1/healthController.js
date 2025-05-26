// src/controllers/v1/healthController.js
import { mailerUp, smsUp } from '../../infra/notifications/NotificationService';
export function getHealth(req, res) {
    res.json({
        status: 'ok',
        emailService: mailerUp ? 'up' : 'down',
        smsService: smsUp ? 'up' : 'down',
    });
}
