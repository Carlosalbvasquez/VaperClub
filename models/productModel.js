// backend/models/productModel.js

import mongoose from 'mongoose';

// 1. Esquema de Reviews (comentarios y calificaciones)
const reviewSchema = mongoose.Schema({
    // Referencia al usuario que dejó la reseña
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Referencia al modelo User
    },
    // Nombre del usuario (para mostrar rápidamente)
    name: {
        type: String,
        required: true,
    },
    // Calificación (1 a 5)
    rating: {
        type: Number,
        required: true,
    },
    // Comentario
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Añade campos createdAt y updatedAt
});

// 2. Esquema Principal de Producto
const productSchema = mongoose.Schema({
    // Referencia al usuario que creó el producto (ej: administrador)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    // Array que contiene todas las reseñas (usando el esquema de review)
    reviews: [reviewSchema],
    
    // Calificación promedio del producto (calculada a partir de las reseñas)
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    // Número total de reseñas
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;