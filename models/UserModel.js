// backend/models/userModel.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Importar la librería de cifrado

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que no haya dos usuarios con el mismo email
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: { // Para el panel de administración
        type: Boolean,
        required: true,
        default: false,
    },
    isWholesaler: { // Para manejar precios B2B (según tu RegisterScreen)
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

// ------------------------------------------------------------------
// MÉTODO 1: Comparar contraseña ingresada con la contraseña cifrada
// ------------------------------------------------------------------
userSchema.methods.matchPassword = async function (enteredPassword) {
    // 'this.password' es la contraseña cifrada almacenada en la DB
    return await bcrypt.compare(enteredPassword, this.password);
};


// ------------------------------------------------------------------
// MÉTODO 2: Cifrar la contraseña ANTES de guardar (middleware pre-save)
// ------------------------------------------------------------------
userSchema.pre('save', async function (next) {
    // Solo cifrar si la contraseña ha sido modificada (ej: no al actualizar solo el nombre)
    if (!this.isModified('password')) {
        next();
    }

    // Generar el salt (la "semilla" para el cifrado)
    const salt = await bcrypt.genSalt(10); 
    
    // Cifrar la contraseña y guardarla en el objeto de usuario
    this.password = await bcrypt.hash(this.password, salt);
});


const User = mongoose.model('User', userSchema);

export default User;