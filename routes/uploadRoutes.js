// backend/routes/uploadRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const { protect, admin } = require('../middlewares/authMiddleware'); // Necesario para proteger

const router = express.Router();

// Configuración de Multer: Definir dónde y con qué nombre se guardarán los archivos
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename(req, file, cb) {
        // Formato: fieldname-timestamp.ext
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// Función de filtro para permitir solo ciertos tipos de archivos (imágenes)
function checkFileType(file, cb) {
    const filetypes = /jpe?g|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Solo se permiten imágenes (JPG, JPEG, PNG, GIF)');
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// POST /api/upload - Ruta para subir una sola imagen
// Protegida: solo admin puede subir
router.post('/', protect, admin, upload.single('image'), (req, res) => {
    // La URL retornada es la ruta estática que se configurará en server.js
    res.send({ 
        message: 'Image uploaded successfully', 
        image: `/${req.file.path.replace(/\\/g, "/")}` // Retornar la ruta
    });
});

module.exports = router;