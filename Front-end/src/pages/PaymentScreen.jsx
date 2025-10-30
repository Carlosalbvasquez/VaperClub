// frontend/src/pages/PaymentScreen.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaMoneyBillAlt, FaCreditCard } from 'react-icons/fa';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice'; 

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Cargar método de pago guardado previamente (PayU por defecto)
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod: savedPaymentMethod } = cart;

    // Estado local para el método de pago seleccionado
    const [paymentMethod, setPaymentMethod] = useState(savedPaymentMethod || 'PayU');

    // Redirigir si no hay dirección de envío
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [navigate, shippingAddress]);
    
    const submitHandler = (e) => {
        e.preventDefault();
        
        // Disparar la acción de Redux para guardar el método de pago
        dispatch(savePaymentMethod(paymentMethod));
        
        // Navegar al siguiente paso: Resumen y Creación de Pedido
        navigate('/placeorder');
    };

    return (
        <div className="bg-graphite text-white min-h-screen pt-4 pb-12">
            <div className="container mx-auto px-4 max-w-lg">
                
                {/* Barra de Progreso */}
                {/* step1: Login (asumido) | step2: Envío (pasado) | step3: Pago (actual) */}
                <CheckoutSteps step1 step2 step3="current" />

                <div className="bg-graphite/70 border border-neon-purple/50 p-8 rounded-lg shadow-neon-purple/50 shadow-lg mt-8">
                    <h1 className="text-3xl font-bold mb-6 text-center text-cyan-bright">
                        <FaCreditCard className="inline mr-2" /> Método de Pago
                    </h1>
                    
                    <form onSubmit={submitHandler}>
                        
                        {/* Opción PayU */}
                        <div className="mb-4 bg-graphite/90 p-4 border border-neon-purple/50 rounded-lg">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    id="PayU"
                                    name="paymentMethod"
                                    value="PayU"
                                    checked={paymentMethod === 'PayU'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="h-5 w-5 text-neon-purple border-neon-purple/50 focus:ring-neon-purple mr-3"
                                />
                                <div>
                                    <span className="text-xl font-bold text-white">PayU / Pagos Online</span>
                                    <p className="text-sm text-gray-400">Tarjetas de crédito, débito y efectivo.</p>
                                </div>
                            </label>
                        </div>

                        {/* Opción MercadoPago */}
                        <div className="mb-6 bg-graphite/90 p-4 border border-neon-purple/50 rounded-lg">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    id="MercadoPago"
                                    name="paymentMethod"
                                    value="MercadoPago"
                                    checked={paymentMethod === 'MercadoPago'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="h-5 w-5 text-neon-purple border-neon-purple/50 focus:ring-neon-purple mr-3"
                                />
                                <div>
                                    <span className="text-xl font-bold text-white">MercadoPago</span>
                                    <p className="text-sm text-gray-400">Cuentas MercadoPago, cuotas y más.</p>
                                </div>
                            </label>
                        </div>

                        {/* Botón Continuar */}
                        <button
                            type="submit"
                            className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-bold py-3 rounded-md transition duration-300 shadow-lg shadow-neon-purple/50"
                        >
                            Continuar al Resumen del Pedido
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentScreen;