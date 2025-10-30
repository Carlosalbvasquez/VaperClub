// backend/server.js (MODIFICADO - Añadir importación de rutas)

const express = require('express');
const dotenv = require('dotenv'); 
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const userRoutes = require('./routes/userRoutes'); 
const productRoutes = require('./routes/productRoutes'); // Importar rutas de Producto
const orderRoutes = require('./routes/orderRoutes'); // Nueva importación
const path = require('path'); // Importar path
const uploadRoutes = require('./routes/uploadRoutes');

// ... (configuración de dotenv y connectDB) ...

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname_custom = path.resolve();
app.use('/uploads', express.static(path.join(__dirname_custom, '/uploads')));

// Middleware para parsing
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// ... (Ruta /) ...

// Definición de Rutas API
app.use('/api/users', userRoutes); 
app.use('/api/products', productRoutes); // Integración de la ruta de Producto
app.use('/api/users', userRoutes); 
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes); // Integración de la ruta de Pedido
app.use('/api/upload', uploadRoutes); // Nueva ruta de Upload
// Middleware de Errores (al final)
app.use(notFound); 
app.use(errorHandler);

// ... (Inicio del servidor) ...