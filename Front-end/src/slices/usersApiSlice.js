// frontend/src/slices/usersApiSlice.js

import { apiSlice } from './apiSlice';

// Endpoints del Back-end
export const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Login
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        
        // 2. Registro
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

        // 3. Logout (normalmente es solo un POST vacío al Back-end para limpiar cookies/sesión)
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        
        // 4. Actualizar Perfil (usado en ProfileScreen)
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
    }),
});

// Exportar los hooks generados automáticamente
export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useUpdateProfileMutation,
} = usersApiSlice;