// backend/seeder.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

// Función para importar datos
const importData = async () => {
    try {
        // 1. Limpiar base de datos antes de empezar
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // 2. Insertar usuarios y obtener el usuario Admin
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers.find((user) => user.isAdmin);

        // 3. Asignar el ID del admin a todos los productos
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser._id };
        });

        // 4. Insertar productos
        await Product.insertMany(sampleProducts);

        console.log('Datos importados con éxito!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Función para destruir datos
const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Datos destruidos con éxito!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Determinar qué función ejecutar basado en el argumento de la terminal
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}