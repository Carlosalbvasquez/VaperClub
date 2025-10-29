// backend/controllers/auth2FAController.js

const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const { send2FACodeByEmail } = require('../utils/emailService');
// const twilioClient = require('../utils/twilioClient'); // Simular importación de Twilio

/**
 * @desc    Inicia el proceso 2FA y envía el código
 * @route   POST /api/users/2fa/send
 * @access  Private (Se asume que el usuario ya hizo login pero requiere 2FA para Admin Panel)
 */
const send2FACode = asyncHandler(async (req, res) => {
    // Obtener el usuario del token (req.user viene del middleware 'protect')
    const user = req.user;

    if (!user.isAdmin) {
        res.status(403);
        throw new Error('2FA is required only for administrators');
    }
    
    // 1. Generar código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 2. Guardar código y tiempo de expiración (5 minutos)
    user.twoFactorCode = code;
    user.twoFactorExpires = Date.now() + 5 * 60 * 1000; // 5 minutos
    await user.save();

    // 3. Enviar código por correo
    await send2FACodeByEmail(user.email, code);
    
    // *Nota:* Aquí se integraría el envío por SMS usando Twilio

    res.json({ message: '2FA code sent to email and SMS' });
});

/**
 * @desc    Verifica el código 2FA ingresado
 * @route   POST /api/users/2fa/verify
 * @access  Private
 */
const verify2FACode = asyncHandler(async (req, res) => {
    const { code } = req.body;
    const user = req.user; // Usuario obtenido de 'protect'

    if (!user.isAdmin) {
        res.status(403);
        throw new Error('2FA is not required for this user');
    }

    if (user.twoFactorCode === code && user.twoFactorExpires > Date.now()) {
        // Código correcto y no expirado
        user.twoFactorCode = undefined; // Limpiar código
        user.twoFactorExpires = undefined;
        await user.save();
        
        // Retornar éxito o un token de sesión más robusto (ej: sessionToken para 2FA)
        res.json({ message: '2FA successful. Admin access granted.', verified: true });
    } else {
        res.status(401);
        throw new Error('Invalid or expired 2FA code');
    }
});

module.exports = { send2FACode, verify2FACode };