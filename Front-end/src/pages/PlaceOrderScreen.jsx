// frontend/src/pages/PlaceOrderScreen.jsx

import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaMapMarkerAlt, FaCreditCard, FaCheckCircle } from 'react-icons/fa';
import CheckoutSteps from '../components/CheckoutSteps';
// import { useCreateOrderMutation } from '../slices/ordersApiSlice'; // Se usará después de implementar las RTK Query
// import { clearCartItems } from '../slices/cartSlice'; // Se usará después

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    
    // Extraer datos del carrito (ya calculados por cartSlice.js)
    const { 
        cartItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        shippingPrice, 
        taxPrice, 
        totalPrice 
    } = cart;

    // Redirigir si faltan datos
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        } else if (!paymentMethod) {
            navigate('/payment');
        }
    }, [shippingAddress, paymentMethod, navigate]);
    
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', { 
            style: 'currency', 
            currency: 'COP', 
            minimumFractionDigits: 0 // Mostrar solo números enteros para la moneda colombiana
        }).format(price);
    };

    // Handler para enviar la orden (solo la simulación por ahora)
    const placeOrderHandler = async () => {
        // Lógica de creación de orden (se implementará con la API del Back-end)
        console.log('Datos listos para enviar al Back-end:', {
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        });
        
        // TODO: Reemplazar con la llamada real a la API (useCreateOrderMutation)
        alert('Simulación: Orden creada con éxito. Navegando a la pantalla de la orden.');
        
        // TODO: Después de crear la orden y obtener el orderId:
        // dispatch(clearCartItems());
        // navigate(`/order/${orderId}`); 
    };

    return (
        <div className="bg-graphite text-white min-h-screen pt-4 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                
                {/* Barra de Progreso */}
                <CheckoutSteps step1 step2 step3 step4="current" />

                <h1 className="text-4xl font-bold mb-8 text-center uppercase text-cyan-bright">
                    <FaCheckCircle className="inline mr-3" /> Resumen del Pedido
                </h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Columna 1 y 2: Detalles del Pedido */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* 1. Detalles de Envío */}
                        <div className="bg-graphite/70 border border-neon-purple/50 p-6 rounded-lg shadow-neon-purple/50 shadow-md">
                            <h2 className="text-2xl font-bold text-neon-purple mb-4 border-b border-cyan-bright/50 pb-2">
                                <FaMapMarkerAlt className="inline mr-2" /> Envío
                            </h2>
                            <p>
                                <strong className="text-white">Dirección:</strong>{' '}
                                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                            </p>
                            <p>
                                <strong className="text-white">Teléfono:</strong> {shippingAddress.phone}
                            </p>
                        </div>
                        
                        {/* 2. Método de Pago */}
                        <div className="bg-graphite/70 border border-neon-purple/50 p-6 rounded-lg shadow-neon-purple/50 shadow-md">
                            <h2 className="text-2xl font-bold text-neon-purple mb-4 border-b border-cyan-bright/50 pb-2">
                                <FaCreditCard className="inline mr-2" /> Pago
                            </h2>
                            <p>
                                <strong className="text-white">Método:</strong> {paymentMethod}
                            </p>
                        </div>

                        {/* 3. Ítems del Pedido */}
                        <div className="bg-graphite/70 border border-neon-purple/50 p-6 rounded-lg shadow-neon-purple/50 shadow-md">
                            <h2 className="text-2xl font-bold text-neon-purple mb-4 border-b border-cyan-bright/50 pb-2">
                                <FaShoppingCart className="inline mr-2" /> Productos
                            </h2>
                            
                            {cartItems.length === 0 ? (
                                <p className="text-white">Tu carrito está vacío.</p>
                            ) : (
                                <div>
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                                            <div className="flex-1">
                                                <Link to={`/product/${item._id}`} className="text-white hover:text-cyan-bright">
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div className="text-right">
                                                {item.qty} x {formatPrice(item.price)} ={' '}
                                                <span className="font-bold text-neon-purple">
                                                    {formatPrice(item.qty * item.price)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Columna 3: Resumen de Precios y Botón de Orden */}
                    <div className="lg:col-span-1">
                        <div className="bg-graphite/80 border border-cyan-bright/50 rounded-lg p-6 shadow-cyan-bright/50 shadow-lg sticky top-4">
                            <h2 className="text-3xl font-bold text-cyan-bright mb-4 border-b border-neon-purple/50 pb-3">
                                Total del Pedido
                            </h2>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Ítems:</span>
                                    <span>{formatPrice(itemsPrice)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Envío:</span>
                                    <span>{formatPrice(shippingPrice)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>IVA (19%):</span>
                                    <span>{formatPrice(taxPrice)}</span>
                                </div>
                                
                                <div className="border-t border-neon-purple/50 pt-4 flex justify-between text-2xl font-extrabold">
                                    <span>Total:</span>
                                    <span className="text-neon-purple">{formatPrice(totalPrice)}</span>
                                </div>
                            </div>
                            
                            {/* Botón para crear la orden */}
                            <button
                                type="button"
                                onClick={placeOrderHandler}
                                disabled={cartItems.length === 0}
                                className="w-full mt-6 bg-cyan-bright hover:bg-cyan-bright/80 text-graphite font-bold py-3 rounded-md transition duration-300 shadow-lg shadow-cyan-bright/50 disabled:opacity-50"
                            >
                                CREAR PEDIDO
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;