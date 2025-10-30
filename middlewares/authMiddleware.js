// backend/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');

/**
 * @desc    Protege rutas: Verifica la validez del token JWT y adjunta el usuario al request.
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Verificar si el token existe en los headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Obtener token (Bearer <token>)
            token = req.headers.authorization.split(' ')[1];

            // 2. Verificar token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Obtener usuario (sin la contraseña) y adjuntarlo al request
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Continuar con la ruta
        } catch (error) {
            console.error(error);
            res.status(401); // Unauthorized
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401); // Unauthorized
        throw new Error('Not authorized, no token');
    }
});

/**
 * @desc    Middleware de administrador: Solo permite el acceso si el usuario es Admin.
 */
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403); // Forbidden
        throw new Error('Not authorized as an admin');
    }
};

module.exports = { protect, admin };