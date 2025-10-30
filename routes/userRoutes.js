// backend/routes/userRoutes.js (MODIFICADO)

const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile } = require('../controllers/userController'); // Se añade getUserProfile
const { protect } = require('../middlewares/authMiddleware'); // Importar el middleware

// POST a /api/users para registrar un usuario
router.route('/').post(registerUser); 

// POST a /api/users/login para autenticar (logear) un usuario
router.post('/login', authUser); 

// GET /api/users/profile - Ruta protegida (requiere token)
router.route('/profile').get(protect, getUserProfile); // Uso del middleware 'protect'

module.exports = router;