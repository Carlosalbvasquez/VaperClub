// frontend/src/store.js (ACTUALIZADO)

import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice'; // <-- Importar authSlice

// Inicializar el carrito desde localStorage (mantener por si acaso)
const cartItemsFromStorage = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart')).cartItems
    : [];

const preloadedState = {
    cart: { cartItems: cartItemsFromStorage },
};

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // Conectar la API slice
        cart: cartReducer,
        auth: authReducer, // Conectar auth slice
    },
    // Añadir el middleware de la API para caching, invalidación, etc.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
    preloadedState,
});

export default store;