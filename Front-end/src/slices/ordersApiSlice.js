// frontend/src/slices/ordersApiSlice.js

import { apiSlice } from './apiSlice';

export const ORDERS_URL = '/api/orders';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Crear Nuevo Pedido (usado en PlaceOrderScreen)
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: order,
            }),
        }),
        
        // 2. Obtener Detalles de un Pedido por ID (usado en OrderScreen)
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDERS_URL}/${orderId}`,
            }),
            keepUnusedDataFor: 5, // Mantiene los datos en caché por 5 segundos
        }),

        // 3. Obtener Pedidos del Usuario (usado en ProfileScreen)
        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/myorders`,
            }),
            keepUnusedDataFor: 5,
        }),
        
        // 4. Marcar como pagado (se usará en el futuro para la integración con pasarelas)
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: details,
            }),
        }),
    }),
});

// Exportar los hooks generados automáticamente
export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    useGetMyOrdersQuery,
    usePayOrderMutation,
} = ordersApiSlice;