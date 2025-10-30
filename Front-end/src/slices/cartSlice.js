// frontend/src/slices/cartSlice.js (ACTUALIZADO - AÑADIR updateCart)

import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils'; // <-- Importar helper

// Cargar estado inicial (incluyendo precios si existen)
const initialState = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { 
        cartItems: [], 
        shippingAddress: {}, 
        paymentMethod: 'PayU',
        itemsPrice: '0.00',
        shippingPrice: '0.00',
        taxPrice: '0.00',
        totalPrice: '0.00'
    };


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Reducer para AÑADIR/ACTUALIZAR un ítem
        addToCart: (state, action) => {
            const item = action.payload; 

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            
            // Llama al helper para actualizar todos los precios y guardar en localStorage
            return updateCart(state);
        },
        
        // Reducer para ELIMINAR un ítem
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            
            // Llama al helper para actualizar todos los precios y guardar en localStorage
            return updateCart(state);
        },
        
        // Reducer para guardar la dirección
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            
            // Llama al helper para actualizar todos los precios (aunque no cambien) y guardar
            return updateCart(state);
        },
        
        // Reducer para guardar el método de pago
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            
            // Llama al helper para actualizar todos los precios y guardar
            return updateCart(state);
        },

        // Nuevo Reducer para limpiar el carrito después de realizar el pedido
        clearCartItems: (state) => {
            state.cartItems = [];
            
            // Llama al helper para resetear los precios y limpiar localStorage
            return updateCart(state);
        }
    },
});

export const { 
    addToCart, 
    removeFromCart, 
    saveShippingAddress, 
    savePaymentMethod, 
    clearCartItems // Exportar el nuevo reducer
} = cartSlice.actions;

export default cartSlice.reducer;