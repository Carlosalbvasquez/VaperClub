// frontend/src/pages/ShippingScreen.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaMapMarkerAlt } from 'react-icons/fa';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice'; 

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Cargar dirección previa del estado de Redux
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    // Estados del formulario, inicializados con valores guardados
    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');
    const [phone, setPhone] = useState(shippingAddress?.phone || '');
    
    const submitHandler = (e) => {
        e.preventDefault();
        
        // Disparar la acción de Redux para guardar la dirección
        dispatch(saveShippingAddress({ address, city, postalCode, country, phone }));
        
        // Navegar al siguiente paso: Pago
        navigate('/payment');
    };

    return (
        <div className="bg-graphite text-white min-h-screen pt-4 pb-12">
            <div className="container mx-auto px-4 max-w-lg">
                
                {/* Barra de Progreso (Asume que el login ya se pasó) */}
                <CheckoutSteps step1 step2="current" />

                <div className="bg-graphite/70 border border-neon-purple/50 p-8 rounded-lg shadow-neon-purple/50 shadow-lg mt-8">
                    <h1 className="text-3xl font-bold mb-6 text-center text-cyan-bright">
                        <FaMapMarkerAlt className="inline mr-2" /> Dirección de Envío
                    </h1>
                    
                    <form onSubmit={submitHandler}>
                        
                        {/* Campo Dirección */}
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-neon-purple mb-1">Dirección Completa</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Ej: Calle 10 # 5 - 40"
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                            />
                        </div>

                        {/* Campo Ciudad y Código Postal (en línea) */}
                        <div className="flex gap-4 mb-4">
                            <div className="w-2/3">
                                <label htmlFor="city" className="block text-neon-purple mb-1">Ciudad</label>
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="Ej: Bogotá D.C."
                                    value={city}
                                    required
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                                />
                            </div>
                            <div className="w-1/3">
                                <label htmlFor="postalCode" className="block text-neon-purple mb-1">Cód. Postal</label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    placeholder="Ej: 110111"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                                />
                            </div>
                        </div>

                        {/* Campo País */}
                        <div className="mb-4">
                            <label htmlFor="country" className="block text-neon-purple mb-1">País</label>
                            <input
                                type="text"
                                id="country"
                                placeholder="Ej: Colombia"
                                value={country}
                                required
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                            />
                        </div>
                        
                        {/* Campo Teléfono */}
                        <div className="mb-6">
                            <label htmlFor="phone" className="block text-neon-purple mb-1">Teléfono (para transportadora)</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Ej: 300 123 4567"
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                            />
                        </div>

                        {/* Botón Continuar */}
                        <button
                            type="submit"
                            className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-bold py-3 rounded-md transition duration-300 shadow-lg shadow-neon-purple/50"
                        >
                            Continuar al Pago
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShippingScreen;