// frontend/src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Componente de Ruta Protegida.
 * Permite el acceso solo si el usuario está logueado.
 * Si no está logueado, redirige a la página de login.
 */
const PrivateRoute = () => {
    // Obtener la información del usuario desde el estado de autenticación de Redux
    // El estado de 'auth' se configura en frontend/src/store.js y frontend/src/slices/authSlice.js
    const { userInfo } = useSelector((state) => state.auth);

    // Si hay información de usuario (userInfo no es null), renderiza el componente anidado (<Outlet />)
    // Si no hay información de usuario, redirige a /login
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoute;