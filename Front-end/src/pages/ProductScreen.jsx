// frontend/src/pages/ProductScreen.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaArrowLeft, FaDollarSign, FaBoxes } from 'react-icons/fa';

const ProductScreen = () => {
    // Obtener el ID del producto de la URL
    const { id } = useParams(); 
    
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Estado de usuario para precios B2B
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isWholesaler = userInfo && userInfo.isWholesaler;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // Llamada al endpoint del Back-end
                const { data } = await axios.get(`/api/products/${id}`); 
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('Producto no encontrado o error de conexión.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        // Lógica de añadir al carrito (pendiente de implementación de Context/Redux)
        console.log(`Añadiendo ${qty} de ${product.name} al carrito.`);
        // navigate(`/cart/${id}?qty=${qty}`); 
    };
    
    // Función para formatear precios
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
    };

    return (
        <div className="bg-graphite text-white min-h-screen pt-4 pb-12">
            <div className="container mx-auto px-4">
                
                {/* Botón de Volver */}
                <Link to="/products" className="inline-flex items-center text-neon-purple hover:text-cyan-bright transition duration-300 mb-6 font-bold">
                    <FaArrowLeft className="mr-2" /> Volver al Catálogo
                </Link>

                {loading ? (
                    <div className="text-center text-cyan-bright text-xl mt-10">Cargando detalles del producto...</div>
                ) : error ? (
                    <div className="bg-red-900 text-white p-4 rounded text-center mt-10">{error}</div>
                ) : product ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        
                        {/* Columna 1: Imagen Principal */}
                        <div className="lg:col-span-1 border border-neon-purple/50 rounded-lg shadow-neon p-4">
                            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md" />
                        </div>

                        {/* Columna 2: Detalles y Descripción */}
                        <div className="lg:col-span-1">
                            <h1 className="text-4xl font-bold text-cyan-bright mb-4">{product.name}</h1>
                            <p className="text-lg text-neon-purple mb-4">{product.category}</p>
                            <p className="text-gray-300 leading-relaxed border-t border-neon-purple/30 pt-4">
                                {product.description}
                            </p>
                            <div className="mt-4 text-sm text-gray-400">
                                <p>Valoración: {product.rating} de 5 ({product.numReviews} reseñas)</p>
                            </div>
                        </div>

                        {/* Columna 3: Información de Compra y Carrito */}
                        <div className="lg:col-span-1 bg-graphite/70 border border-neon-purple rounded-lg p-6 shadow-neon-purple/50 shadow-md">
                            <h2 className="text-2xl font-bold text-neon-purple mb-4">Información de Compra</h2>
                            
                            <div className="mb-4 text-lg font-medium">
                                <FaDollarSign className="inline mr-2 text-cyan-bright" />
                                Precio Detal: <span className="text-white">{formatPrice(product.price)}</span>
                            </div>
                            
                            {/* Precio Mayorista (Si aplica) */}
                            {isWholesaler && product.wholesalePrice > 0 && (
                                <div className="mb-4 text-xl font-bold border-b border-neon-purple/50 pb-3">
                                    <FaDollarSign className="inline mr-2 text-cyan-bright" />
                                    Precio Mayorista: <span className="text-cyan-bright">{formatPrice(product.wholesalePrice)}</span>
                                </div>
                            )}

                            <div className="mb-4 text-lg font-medium">
                                <FaBoxes className="inline mr-2 text-cyan-bright" />
                                Estado: 
                                <span className={product.countInStock > 0 ? 'text-green-500 ml-2' : 'text-red-500 ml-2'}>
                                    {product.countInStock > 0 ? `En Stock (${product.countInStock})` : 'Agotado'}
                                </span>
                            </div>

                            {/* Selector de Cantidad */}
                            {product.countInStock > 0 && (
                                <div className="flex items-center mb-6">
                                    <label htmlFor="qty" className="text-white mr-4">Cantidad:</label>
                                    <select
                                        id="qty"
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                        className="bg-graphite text-white border border-neon-purple/50 rounded p-2 focus:ring-cyan-bright"
                                    >
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Botón de Carrito */}
                            <button
                                onClick={addToCartHandler}
                                disabled={product.countInStock === 0}
                                className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-bold py-3 rounded-md transition duration-300 shadow-lg shadow-neon-purple/50 flex items-center justify-center disabled:bg-gray-700"
                            >
                                <FaShoppingCart className="mr-3" />
                                {product.countInStock > 0 ? 'AÑADIR AL CARRITO' : 'AGOTADO'}
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ProductScreen;