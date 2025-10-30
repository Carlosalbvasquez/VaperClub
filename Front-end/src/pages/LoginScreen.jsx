// frontend/src/pages/LoginScreen.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaSignInAlt } from 'react-icons/fa';
import { useLoginMutation } from '../slices/usersApiSlice'; // RTK Query hook
import { setCredentials } from '../slices/authSlice'; // Acción de Redux
import Loader from '../components/Loader';
import Message from '../components/Message';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    const [login, { isLoading }] = useLoginMutation();

    // Lógica para redirigir al usuario si intenta acceder a una ruta protegida
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Llama a la mutación de login (RTK Query)
            const res = await login({ email, password }).unwrap(); 
            
            // Guarda las credenciales en Redux y localStorage
            dispatch(setCredentials({ ...res }));
            
            // Redirige al destino
            navigate(redirect);
        } catch (err) {
            // Manejo de errores de la API
            setError(err?.data?.message || err.error || 'Ocurrió un error en el servidor.');
        }
    };

    return (
        <div className="bg-graphite text-white min-h-screen pt-4 pb-12">
            <div className="container mx-auto px-4 max-w-md">
                <div className="bg-graphite/70 border border-neon-purple/50 p-8 rounded-lg shadow-neon-purple/50 shadow-lg mt-8">
                    <h1 className="text-3xl font-bold mb-6 text-center text-cyan-bright">
                        <FaSignInAlt className="inline mr-2" /> Iniciar Sesión
                    </h1>
                    
                    {error && <Message variant="danger" className="mb-4">{error}</Message>}
                    
                    <form onSubmit={submitHandler}>
                        
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
                        <div className="mb-6">
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

                        {/* Botón Iniciar Sesión */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-neon-purple hover:bg-neon-purple/80 text-white font-bold py-3 rounded-md transition duration-300 shadow-lg shadow-neon-purple/50 disabled:bg-gray-700"
                        >
                            INICIAR SESIÓN
                        </button>
                    </form>
                    
                    {isLoading && <Loader />}
                    
                    <div className="mt-6 text-center">
                        <p className="text-gray-300">
                            ¿Nuevo Cliente?{' '}
                            <Link 
                                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                                className="text-cyan-bright hover:text-neon-purple font-bold"
                            >
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;