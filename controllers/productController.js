// backend/controllers/productController.js

const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

/**
 * @desc    Obtener todos los productos
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}); // Buscar todos
    res.json(products);
});

/**
 * @desc    Obtener un solo producto por ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

/**
 * @desc    Crear un nuevo producto
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
    // Valores por defecto o de prueba
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.user._id, // Usuario creador (obtenido del middleware 'protect')
        image: '/images/sample.jpg',
        category: 'Sample Category',
        countInStock: 0,
        description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});


/**
 * @desc    Actualizar un producto existente
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, category, countInStock, wholesalePrice } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        // Actualizar campos
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.category = category || product.category;
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        product.wholesalePrice = wholesalePrice !== undefined ? wholesalePrice : product.wholesalePrice;
        
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

/**
 * @desc    Eliminar un producto
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,

};
