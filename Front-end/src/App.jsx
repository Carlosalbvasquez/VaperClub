// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute'; // Componente para rutas que requieren login
import AdminRoute from './components/AdminRoute';   // Componente para rutas que requieren ser Admin

// Rutas Generales y de Productos
import HomeScreen from './pages/HomeScreen';
import ProductListScreen from './pages/ProductListScreen'; 
import ProductScreen from './pages/ProductScreen'; 

// Rutas de Autenticación y Perfil
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen'; 
import ProfileScreen from './pages/ProfileScreen'; 

// Rutas del Flujo de Checkout
import CartScreen from './pages/CartScreen'; 
import ShippingScreen from './pages/ShippingScreen'; 
import PaymentScreen from './pages/PaymentScreen'; 
import PlaceOrderScreen from './pages/PlaceOrderScreen'; 
import OrderScreen from './pages/OrderScreen'; // Usaremos un placeholder por ahora

// Rutas de Administración (Placeholders o Implementados)
import UserListScreen from './pages/admin/UserListScreen'; 
import ProductListScreenAdmin from './pages/admin/ProductListScreenAdmin'; 
import OrderListScreen from './pages/admin/OrderListScreen'; 
import ProductEditScreen from './pages/admin/ProductEditScreen'; 


// ********** Componentes Placeholder para Rutas Pendientes **********
// Nota: Estos componentes deben crearse en sus respectivas ubicaciones.
const Placeholder = ({ title }) => (
    <div className="bg-graphite text-white min-h-screen pt-4 pb-12 text-center text-2xl">
        <h1 className="text-4xl font-bold mb-8 text-cyan-bright">{title}</h1>
        <p>Esta pantalla está pendiente de implementación. (Usando Placeholder)</p>
    </div>
);
const DummyOrder = () => <Placeholder title="Detalles del Pedido" />;
const DummyUserList = () => <Placeholder title="Gestión de Usuarios (Admin)" />;
const DummyProductListAdmin = () => <Placeholder title="Gestión de Productos (Admin)" />;
const DummyOrderList = () => <Placeholder title="Gestión de Pedidos (Admin)" />;
const DummyProductEdit = () => <Placeholder title="Edición de Producto (Admin)" />;
// ********************************************************************


const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3 bg-graphite min-h-screen">
                <div className="container mx-auto">
                    <Routes>
                        
                        {/* Rutas Públicas */}
                        <Route path="/" element={<HomeScreen />} exact />
                        <Route path="/products" element={<ProductListScreen />} />
                        <Route path="/product/:id" element={<ProductScreen />} />
                        <Route path="/cart" element={<CartScreen />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        
                        {/* ------------------------------------------------------------- */}
                        {/* Rutas Protegidas por Login (Se usa <PrivateRoute> para envolverlas) */}
                        {/* ------------------------------------------------------------- */}
                        
                        <Route path="" element={<PrivateRoute />}>
                            {/* Flujo de Checkout */}
                            <Route path="/shipping" element={<ShippingScreen />} />
                            <Route path="/payment" element={<PaymentScreen />} />
                            <Route path="/placeorder" element={<PlaceOrderScreen />} />
                            <Route path="/order/:id" element={<DummyOrder />} /> 

                            {/* Perfil de Usuario */}
                            <Route path="/profile" element={<ProfileScreen />} />
                        </Route>

                        {/* ------------------------------------------------------------- */}
                        {/* Rutas de Administración (Se usa <AdminRoute> para envolverlas) */}
                        {/* ------------------------------------------------------------- */}

                        <Route path="" element={<AdminRoute />}>
                            <Route path="/admin/userlist" element={<DummyUserList />} />
                            <Route path="/admin/productlist" element={<DummyProductListAdmin />} />
                            <Route path="/admin/orderlist" element={<DummyOrderList />} />
                            <Route path="/admin/product/:id/edit" element={<DummyProductEdit />} />
                        </Route>

                    </Routes>
                </div>
            </main>
        </Router>
    );
};

export default App;