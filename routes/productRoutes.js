// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middlewares/authMiddleware'); // Importar middlewares

// Rutas públicas (GET) y Rutas protegidas para Admin (POST, DELETE, PUT)
router.route('/')
    .get(getProducts) // Todos los usuarios pueden listar
    .post(protect, admin, createProduct); // Solo Admin puede crear

router.route('/:id')
    .get(getProductById) // Todos los usuarios pueden ver el detalle
    .delete(protect, admin, deleteProduct) // Solo Admin puede eliminar
    .put(protect, admin, updateProduct); // Solo Admin puede actualizar

module.exports = router;