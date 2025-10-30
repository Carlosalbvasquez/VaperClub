// frontend/src/pages/ProfileScreen.jsx (INTEGRACIÓN DE RTK QUERY)

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaListAlt, FaLock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useUpdateProfileMutation } from '../slices/usersApiSlice'; // <-- RTK Query: Actualizar perfil
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';     // <-- RTK Query: Obtener mis pedidos
import { setCredentials } from '../slices/authSlice';               // <-- Acción: Guardar nuevas credenciales
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null); // Para mostrar mensajes de éxito/error local

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    // RTK Query Hooks
    const [updateProfile, { isLoading: loadingUpdate }] = useUpdateProfileMutation();
    const { 
        data: orders, 
        isLoading: loadingOrders, 
        error: errorOrders 
    } = useGetMyOrdersQuery();
    
    // ----------------------------------------------------
    // Lógica de Redirección y Carga de Datos Inicial
    // ----------------------------------------------------
    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [navigate, userInfo]);

    // ----------------------------------------------------
    // Handler de Actualización de Perfil
    // ----------------------------------------------------
    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
        } else {
            setMessage(null);
            
            try {
                // Llama a la mutación de actualización de perfil
                const res = await updateProfile({ 
                    _id: userInfo._id, 
                    name, 
                    email, 
                    password,
                }).unwrap();
                
                // Actualiza el estado de Redux y localStorage con los nuevos datos
                dispatch(setCredentials({ ...res })); 
                setMessage('Perfil actualizado con éxito.');
                
                // Limpiar campos de contraseña después del éxito
                setPassword('');
                setConfirmPassword('');

            } catch (err) {
                // Manejo de errores de la API
                setMessage(err?.data?.message || err.error);
            }
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', { 
            style: 'currency', 
            currency: 'COP', 
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="bg-graphite text-white min-h-screen pt-4 pb-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-4xl font-bold mb-8 text-center uppercase text-cyan-bright">
                    <FaUser className="inline mr-3" /> Mi Perfil
                </h1>

                {/* Mensajes de Alerta */}
                {message && <Message variant={message.includes('éxito') ? "success" : "danger"} className="mb-4">{message}</Message>}
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Columna 1: Formulario de Perfil */}
                    <div className="lg:col-span-1 bg-graphite/70 border border-neon-purple/50 p-6 rounded-lg shadow-neon-purple/50 shadow-lg">
                        <h2 className="text-2xl font-bold text-neon-purple mb-6 border-b border-cyan-bright/50 pb-2">
                            Actualizar Datos
                        </h2>
                        
                        <form onSubmit={submitHandler}>
                            {/* Campos... (Name, Email, Password, Confirm Password - sin cambios en la estructura) */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-neon-purple mb-1">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-neon-purple mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-neon-purple mb-1">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Nueva contraseña (opcional)"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="confirmPassword" className="block text-neon-purple mb-1">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirma la nueva contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                                />
                            </div>
                            
                            {/* Botón de Guardar */}
                            <button
                                type="submit"
                                disabled={loadingUpdate}
                                className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-bold py-3 rounded-md transition duration-300 shadow-lg shadow-neon-purple/50 disabled:opacity-50"
                            >
                                {loadingUpdate ? 'ACTUALIZANDO...' : 'ACTUALIZAR PERFIL'}
                            </button>
                            {loadingUpdate && <Loader />}
                        </form>
                    </div>

                    {/* Columna 2 y 3: Pedidos del Usuario */}
                    <div className="lg:col-span-2 bg-graphite/70 border border-cyan-bright/50 p-6 rounded-lg shadow-cyan-bright/50 shadow-lg">
                        <h2 className="text-2xl font-bold text-cyan-bright mb-6 border-b border-neon-purple/50 pb-2">
                            <FaListAlt className="inline mr-2" /> Mis Pedidos
                        </h2>

                        {loadingOrders ? (
                            <Loader />
                        ) : errorOrders ? (
                            <Message variant="danger">
                                {errorOrders?.data?.message || 'Error al cargar pedidos'}
                            </Message>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-neon-purple/50">
                                    <thead className="bg-graphite">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-cyan-bright uppercase tracking-wider">ID</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-cyan-bright uppercase tracking-wider">FECHA</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-cyan-bright uppercase tracking-wider">TOTAL</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-cyan-bright uppercase tracking-wider">PAGADO</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-cyan-bright uppercase tracking-wider">ENTREGADO</th>
                                            <th className="px-4 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neon-purple/30">
                                        {orders.map((order) => (
                                            <tr key={order._id} className="hover:bg-graphite/50 transition duration-150">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{order._id.substring(0, 10)}...</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{order.createdAt.substring(0, 10)}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-neon-purple">{formatPrice(order.totalPrice)}</td>
                                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                                    {order.isPaid ? (
                                                        <FaCheckCircle className="text-green-500 mx-auto" title={`Pagado el ${order.paidAt.substring(0, 10)}`} />
                                                    ) : (
                                                        <FaLock className="text-red-500 mx-auto" title="Pendiente de Pago" />
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                                    {order.isDelivered ? (
                                                        <FaCheckCircle className="text-green-500 mx-auto" title={`Entregado el ${order.deliveredAt.substring(0, 10)}`} />
                                                    ) : (
                                                        <FaExclamationTriangle className="text-yellow-500 mx-auto" title="Pendiente de Entrega" />
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link 
                                                        to={`/order/${order._id}`}
                                                        className="text-cyan-bright hover:text-neon-purple font-bold transition duration-300"
                                                    >
                                                        Ver
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;