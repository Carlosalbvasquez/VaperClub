// frontend/src/pages/CartScreen.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaTrash, FaArrowLeft } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlice'; 

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Obtener el estado del carrito desde Redux
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    // Función para formatear precios
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
    };

    // Handler para actualizar la cantidad de un ítem
    const updateQtyHandler = (item, qty) => {
        // Dispara la acción addToCart (que también sirve para actualizar)
        dispatch(addToCart({ ...item, qty: Number(qty) }));
    };

    // Handler para eliminar un ítem
    const removeCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    // Handler para ir al Checkout
    const checkoutHandler = () => {
        // Redirigir a /login si no está logueado, sino a /shipping
        // Por ahora, solo redirigimos a /login, pues el flujo de usuario aún no está implementado
        navigate('/login?redirect=/shipping');
    };

    // Cálculos del Subtotal
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <div className="bg-graphite text-white min-h-screen pt-4 pb-12">
            <div className="container mx-auto px-4">
                <Link to="/products" className="inline-flex items-center text-neon-purple hover:text-cyan-bright transition duration-300 mb-6 font-bold">
                    <FaArrowLeft className="mr-2" /> Seguir Comprando
                </Link>

                <h1 className="text-4xl font-bold mb-8 text-center uppercase text-cyan-bright">
                    <FaShoppingCart className="inline mr-3" /> Tu Carrito de Compras
                </h1>

                {cartItems.length === 0 ? (
                    <div className="bg-graphite/70 border border-neon-purple/50 p-8 rounded-lg text-center shadow-neon-purple/50 shadow-lg mt-10">
                        <p className="text-xl text-white mb-4">Tu carrito está vacío.</p>
                        <Link to="/products" className="text-neon-purple hover:text-cyan-bright font-medium underline">
                            Ir al Catálogo
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        
                        {/* Columna 1-3: Items del Carrito */}
                        <div className="lg:col-span-3">
                            <div className="bg-graphite/50 border border-neon-purple/50 rounded-lg shadow-neon-purple/30 p-4">
                                
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex items-center border-b border-neon-purple/30 py-4 last:border-b-0">
                                        
                                        {/* Imagen */}
                                        <div className="w-20 h-20 mr-4 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md border border-cyan-bright/50" />
                                        </div>
                                        
                                        {/* Nombre */}
                                        <div className="flex-grow">
                                            <Link to={`/product/${item._id}`} className="text-lg font-bold text-white hover:text-neon-purple transition duration-300">
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-gray-400">{formatPrice(item.price)}</p>
                                        </div>
                                        
                                        {/* Cantidad */}
                                        <div className="w-24 mx-4">
                                            <select
                                                value={item.qty}
                                                onChange={(e) => updateQtyHandler(item, e.target.value)}
                                                className="w-full bg-graphite border border-neon-purple/50 text-white rounded p-2 focus:ring-cyan-bright"
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        {/* Subtotal Item */}
                                        <div className="w-28 text-right font-bold text-neon-purple">
                                            {formatPrice(item.price * item.qty)}
                                        </div>

                                        {/* Botón Eliminar */}
                                        <button
                                            onClick={() => removeCartHandler(item._id)}
                                            className="ml-4 p-2 text-red-500 hover:text-red-400 transition duration-300"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {/* Columna 4: Resumen del Pedido */}
                        <div className="lg:col-span-1">
                            <div className="bg-graphite/70 border border-cyan-bright/50 rounded-lg p-6 shadow-neon-purple/50 shadow-md sticky top-4">
                                <h2 className="text-2xl font-bold text-neon-purple mb-4 border-b border-cyan-bright/50 pb-2">
                                    Resumen ({totalItems} {totalItems === 1 ? 'Producto' : 'Productos'})
                                </h2>
                                
                                <div className="flex justify-between text-xl font-bold text-white mb-6">
                                    <span>Subtotal:</span>
                                    <span className="text-cyan-bright">{formatPrice(itemsPrice)}</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={checkoutHandler}
                                    disabled={cartItems.length === 0}
                                    className="w-full bg-cyan-bright hover:bg-cyan-bright/80 text-graphite font-bold py-3 rounded-md transition duration-300 shadow-lg shadow-cyan-bright/50 flex items-center justify-center disabled:opacity-50"
                                >
                                    PROCEDER AL PAGO
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartScreen;