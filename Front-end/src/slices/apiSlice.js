// frontend/src/slices/apiSlice.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// URL del Back-end (ajustar si es necesario)
export const BASE_URL = ''; // Si usas un proxy en package.json (Recomendado)
// const BASE_URL = 'http://localhost:5000'; // Si no usas proxy

// Obtener el token de autorización del localStorage si existe
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        // Asumimos que el estado de autenticación se guarda en state.auth.userInfo
        const token = getState().auth.userInfo?.token; 
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'], // Tipos de tags para invalidación de caché
    endpoints: (builder) => ({
        // Aquí se inyectarán las endpoints de las API específicas (usersApi, ordersApi)
    }),
});