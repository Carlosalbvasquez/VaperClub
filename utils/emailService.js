// backend/utils/emailService.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT, // 587 para TLS o 465 para SSL
    secure: process.env.EMAIL_PORT == 465, // true para 465, false para otros
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const send2FACodeByEmail = async (email, code) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'VaperClub - Código de Verificación de Acceso (2FA)',
        html: `
            <p>Tu código de autenticación de dos factores es: <strong>${code}</strong></p>
            <p>Este código expira en 5 minutos.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};

// *Nota:* La implementación de SMS con Twilio requiere una lógica similar
// utilizando el cliente twilio y sus respectivas variables de entorno (TWILIO_SID, TWILIO_TOKEN, etc.).

module.exports = { send2FACodeByEmail };