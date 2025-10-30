const asyncHandler = require('express-async-handler');
const User = require('../models/UserModel');
const generateToken = require('../utils/generateToken');

/* ... tus funciones registerUser y authUser ... */

/**
 * @desc    Obtener datos del perfil de usuario
 * @route   GET /api/users/profile
 * @access  Private (Protegida)
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const user = req.user; 
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            isWholesaler: user.isWholesaler,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// ¡Solo esta exportación al final!
module.exports = { registerUser, authUser, getUserProfile };
