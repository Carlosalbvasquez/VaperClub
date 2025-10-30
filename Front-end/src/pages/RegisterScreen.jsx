// frontend/src/pages/RegisterScreen.jsx (ACTUALIZADO CON RTK QUERY)

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserPlus } from 'react-icons/fa';
import { useRegisterMutation } from '../slices/usersApiSlice'; // <-- RTK Query hook
import { setCredentials } from '../slices/authSlice';       // <-- Acción de Redux
import Loader from '../components/Loader';                   // <-- Componente de carga
import Message from '../components/Message';                 // <-- Componente de mensajes

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isWholesaler, setIsWholesaler] = useState(false); // <-- Campo adicional
    const [message, setMessage] = useState(null);           // Para errores de contraseña
    const [apiError, setApiError] = useState(null);         // Para errores de la API

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const [register, { isLoading }] = useRegisterMutation(); // <-- Hook RTK Query

    // Lógica para redirigir (obtiene el parámetro 'redirect' de la URL)
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        // Si el usuario ya está logueado, lo redirigimos
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setApiError(null);
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }

        try {
            // Llama a la mutación de registro (RTK Query)
            const res = await register({ name, email, password, isWholesaler }).unwrap(); 
            
            // Guarda las credenciales en Redux y localStorage
            dispatch(setCredentials({ ...res }));
            
            // Redirige al destino
            navigate(redirect);
        } catch (err) {
            // Manejo de errores de la API
            setApiError(err?.data?.message || err.error || 'Ocurrió un error en el servidor.');
        }
    };

    return (
        <div className="bg-graphite text-white min-h-screen pt-4 pb-12">
            <div className="container mx-auto px-4 max-w-md">
                <div className="bg-graphite/70 border border-neon-purple/50 p-8 rounded-lg shadow-neon-purple/50 shadow-lg mt-8">
                    <h1 className="text-3xl font-bold mb-6 text-center text-cyan-bright">
                        <FaUserPlus className="inline mr-2" /> Crear Cuenta
                    </h1>
                    
                    {/* Mensajes de error/advertencia */}
                    {apiError && <Message variant="danger" className="mb-4">{apiError}</Message>}
                    {message && <Message variant="danger" className="mb-4">{message}</Message>}
                    
                    <form onSubmit={submitHandler}>
                        
                        {/* Campo Nombre */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-neon-purple mb-1">Nombre Completo</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Ingresa tu nombre"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                            />
                        </div>

                        {/* Campo Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-neon-purple mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Ingresa tu email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-neon-purple mb-1">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Ingresa tu contraseña"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                            />
                        </div>

                        {/* Campo Confirmar Contraseña */}
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-neon-purple mb-1">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirma tu contraseña"
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-graphite text-white border border-neon-purple/50 rounded p-3 focus:ring-cyan-bright focus:border-cyan-bright transition duration-300"
                            />
                        </div>

                        {/* Checkbox Mayorista */}
                        <div className="mb-6 flex items-center">
                            <input
                                type="checkbox"
                                id="isWholesaler"
                                checked={isWholesaler}
                                onChange={(e) => setIsWholesaler(e.target.checked)}
                                className="w-4 h-4 text-neon-purple bg-gray-700 border-gray-600 rounded focus:ring-neon-purple/50"
                            />
                            <label htmlFor="isWholesaler" className="ml-2 text-sm text-white">
                                Registrarme como Mayorista (Ver precios B2B)
                            </label>
                        </div>

                        {/* Botón Registrarse */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-cyan-bright hover:bg-cyan-bright/80 text-graphite font-bold py-3 rounded-md transition duration-300 shadow-lg shadow-cyan-bright/50 disabled:bg-gray-700"
                        >
                            {isLoading ? 'REGISTRANDO...' : 'REGISTRARME'}
                        </button>
                    </form>
                    
                    {/* Indicador de carga */}
                    {isLoading && <Loader />}
                    
                    <div className="mt-6 text-center">
                        <p className="text-gray-300">
                            ¿Ya tienes cuenta?{' '}
                            <Link 
                                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                                className="text-neon-purple hover:text-cyan-bright font-bold"
                            >
                                Inicia Sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;

