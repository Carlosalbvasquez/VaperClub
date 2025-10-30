// frontend/src/pages/HomeScreen.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFire, FaStore, FaHandshake } from 'react-icons/fa';

const HomeScreen = () => {
    return (
        // Fondo oscuro tipo gamer con padding vertical
        <div className="bg-graphite text-white min-h-screen pt-12 pb-20">
            <div className="container mx-auto px-4">
                
                {/* Sección Hero: Título y Llamada a la Acción */}
                <section className="text-center py-20">
                    <h1 className="text-6xl md:text-8xl font-extrabold mb-4 uppercase text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-cyan-bright tracking-tight shadow-text-neon">
                        VAPERCLUB
                    </h1>
                    <h2 className="text-2xl md:text-3xl text-cyan-bright font-light mb-8">
                        La nueva era del vapor. Diseño, rendimiento y estilo gamer.
                    </h2>
                    
                    {/* Botón principal brillante */}
                    <Link
                        to="/products"
                        className="inline-flex items-center justify-center px-10 py-4 border-2 border-neon-purple text-lg font-bold rounded-full text-white bg-neon-purple transition duration-500 transform hover:scale-105 shadow-neon hover:shadow-cyan-bright/50"
                    >
                        <FaFire className="mr-3 text-2xl" />
                        VER CATÁLOGO HOY
                    </Link>
                </section>

                {/* Sección de Características/Valores */}
                <section className="py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Tarjeta 1: Venta al Detal */}
                        <div className="bg-graphite/50 p-6 rounded-xl border border-neon-purple/50 shadow-neon-purple/30 shadow-lg text-center transition duration-500 hover:border-cyan-bright">
                            <FaStore className="text-5xl text-cyan-bright mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-neon-purple mb-3">Venta B2C</h3>
                            <p className="text-gray-300">
                                Explora nuestra selección premium. Los mejores precios al detal y envío rápido garantizado.
                            </p>
                        </div>
                        
                        {/* Tarjeta 2: Diseño Gamer */}
                        <div className="bg-graphite/50 p-6 rounded-xl border border-neon-purple/50 shadow-neon-purple/30 shadow-lg text-center transition duration-500 hover:border-cyan-bright">
                            <FaFire className="text-5xl text-cyan-bright mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-neon-purple mb-3">Estética Neón</h3>
                            <p className="text-gray-300">
                                Dispositivos con estilo único. Fondo oscuro y luces neón que definen la experiencia.
                            </p>
                        </div>
                        
                        {/* Tarjeta 3: Venta Mayorista */}
                        <div className="bg-graphite/50 p-6 rounded-xl border border-neon-purple/50 shadow-neon-purple/30 shadow-lg text-center transition duration-500 hover:border-cyan-bright">
                            <FaHandshake className="text-5xl text-cyan-bright mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-neon-purple mb-3">Mayoristas (B2B)</h3>
                            <p className="text-gray-300">
                                Precios y planes especiales para distribuidores. Regístrate en nuestra sección de Mayoristas.
                            </p>
                        </div>

                    </div>
                </section>

                {/* Sección de Módulos (Placeholder) */}
                <section className="text-center py-12 border-t border-neon-purple/30 mt-10">
                    <p className="text-lg text-gray-400">
                        {/* Placeholder para un posible carrusel de productos destacados */}
                        {/* Este es el espacio para los productos más vendidos o las novedades. */}
                        ¡Pronto: Carrusel de Productos Destacados!
                    </p>
                </section>
                
            </div>
        </div>
    );
};

export default HomeScreen;