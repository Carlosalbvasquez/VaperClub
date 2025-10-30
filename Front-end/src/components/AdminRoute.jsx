// frontend/src/components/AdminRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Componente de Ruta de Administrador.
 * Permite el acceso solo si el usuario está logueado Y tiene el rol isAdmin = true.
 * Si no cumple, redirige a /login.
 */
const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    // Si hay usuario Y el usuario es administrador, permite el acceso.
    // De lo contrario, redirige a la página principal.
    return userInfo && userInfo.isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to='/' replace /> // Redirige a la página principal si no es Admin
    );
};

export default AdminRoute;