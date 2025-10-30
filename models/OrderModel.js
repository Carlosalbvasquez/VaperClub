// backend/models/orderModel.js

import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    // Referencia al usuario que realizó la compra
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    // Array de los productos comprados (similares a cartItems en el Front-end)
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: { // ID del producto en el inventario
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
        },
    ],
    // Dirección de envío (capturada en ShippingScreen)
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
    },
    // Método de pago (ej: PayU, PayPal, Contra-Entrega)
    paymentMethod: {
        type: String,
        required: true,
    },
    // Objeto con detalles de la transacción (una vez pagado)
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
    },
    // Precio de los ítems (subtotal)
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    // Costo del envío
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    // Impuestos (IVA)
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    // Precio total final
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    // Indicadores de estado
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;