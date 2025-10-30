// frontend/src/components/Header.jsx (ACTUALIZADO CON LOGOUT)

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaCog, FaBoxes } from 'react-icons/fa';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Obtener info del usuario y items del carrito desde Redux
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            // 1. Llama a la API de logout para limpiar cookies/sesión en el servidor
            await logoutApiCall().unwrap();
            
            // 2. Limpia el estado de Redux y localStorage
            dispatch(logout()); 
            
            // 3. Redirige al login o a la página principal
            navigate('/login');
        } catch (err) {
            console.error(err); 
            // En caso de fallo de API, forzamos el logout del cliente por seguridad
            dispatch(logout()); 
            navigate('/login');
        }
    };

    // Contador total de items en el carrito
    const totalCartItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <header className="bg-graphite border-b border-neon-purple/50 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* Logo / Nombre del Sitio */}
                <Link to="/" className="text-3xl font-extrabold text-cyan-bright hover:text-neon-purple transition duration-300 uppercase tracking-widest">
                    VaperClub
                </Link>

                {/* Navegación Derecha */}
                <nav className="flex items-center space-x-6">
                    
                    {/* Catálogo */}
                    <Link to="/products" className="text-white hover:text-cyan-bright transition duration-300 font-medium flex items-center">
                        <FaBoxes className="mr-2" /> Catálogo
                    </Link>

                    {/* Carrito de Compras */}
                    <Link to="/cart" className="relative text-white hover:text-cyan-bright transition duration-300">
                        <FaShoppingCart className="text-xl" />
                        {totalCartItems > 0 && (
                            <span className="absolute -top-3 -right-3 bg-neon-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {totalCartItems}
                            </span>
                        )}
                    </Link>

                    {/* Menú de Usuario / Login */}
                    {userInfo ? (
                        // Menú Desplegable para Usuario Logueado
                        <div className="relative group">
                            <button className="text-white hover:text-neon-purple transition duration-300 font-bold flex items-center p-2 rounded-md border border-transparent group-hover:border-neon-purple/50">
                                <FaUser className="mr-2" /> {userInfo.name.split(' ')[0]} 
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-graphite border border-neon-purple/50 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 transform scale-95 group-hover:scale-100 origin-top-right">
                                <Link to="/profile" className="block px-4 py-2 text-sm text-white hover:bg-neon-purple/20 flex items-center">
                                    <FaUser className="mr-2" /> Perfil
                                </Link>
                                
                                {userInfo.isAdmin && (
                                    <>
                                        <div className="border-t border-neon-purple/20"></div>
                                        <Link to="/admin/productlist" className="block px-4 py-2 text-sm text-cyan-bright hover:bg-neon-purple/20 flex items-center">
                                            <FaCog className="mr-2" /> Admin
                                        </Link>
                                    </>
                                )}
                                
                                <div className="border-t border-neon-purple/20"></div>
                                <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 flex items-center transition duration-200">
                                    <FaSignOutAlt className="mr-2" /> Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    ) : (
                        // Enlace de Login
                        <Link to="/login" className="bg-neon-purple px-4 py-2 rounded-md text-white font-bold hover:bg-neon-purple/80 transition duration-300 flex items-center">
                            <FaUser className="mr-2" /> Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;