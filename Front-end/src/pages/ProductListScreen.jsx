// frontend/src/pages/ProductScreen.jsx (MODIFICADO)

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // <-- Importar useDispatch
import axios from 'axios';
import { FaShoppingCart, FaArrowLeft, FaDollarSign, FaBoxes } from 'react-icons/fa';
import { addToCart } from '../slices/cartSlice'; // <-- Importar la acción de Redux

const ProductScreen = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const dispatch = useDispatch(); // <-- Inicializar dispatch
    
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // ... (Lógica de userInfo y formatPrice sin cambios) ...
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const isWholesaler = userInfo && userInfo.isWholesaler;
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
    };


    useEffect(() => {
        // ... (Lógica de fetchProduct sin cambios) ...
        const fetchProduct = async () => {
            try {
                setLoading(true);
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

    // Función modificada para Redux
    const addToCartHandler = () => {
        // Disparar la acción addToCart con el ítem completo y la cantidad
        dispatch(addToCart({ 
            ...product, 
            qty, // Cantidad seleccionada
            // Incluir el precio adecuado basado en si es mayorista o no, para el estado del carrito
            price: isWholesaler ? product.wholesalePrice || product.price : product.price
        }));
        
        // Redirigir al usuario a la pantalla del carrito
        navigate('/cart');
    };
    
    return (
        <div className="bg-graphite text-white min-h-screen pt-4 pb-12">
           {/* ... (Todo el JSX de la pantalla de producto sin cambios, hasta el botón) ... */}
            
           {product && (
            // ... (JSX de la vista del producto) ...
            
            <div className="lg:col-span-1 bg-graphite/70 border border-neon-purple rounded-lg p-6 shadow-neon-purple/50 shadow-md">
                {/* ... (Detalles de precio y stock) ... */}
                
                {/* Selector de Cantidad */}
                {product.countInStock > 0 && (
                    // ... (Selector de Cantidad sin cambios) ...
                )}

                {/* Botón de Carrito - Usa el nuevo handler */}
                <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-bold py-3 rounded-md transition duration-300 shadow-lg shadow-neon-purple/50 flex items-center justify-center disabled:bg-gray-700"
                >
                    <FaShoppingCart className="mr-3" />
                    {product.countInStock > 0 ? 'AÑADIR AL CARRITO' : 'AGOTADO'}
                </button>
            </div>
           )}
        </div>
    );
};

export default ProductScreen;