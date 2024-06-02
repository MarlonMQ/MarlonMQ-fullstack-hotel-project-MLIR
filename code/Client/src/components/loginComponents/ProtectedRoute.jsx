// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';

const ProtectedRoute = () => {
  const { rol } = useContext(AuthContext);

  return rol === 'admin' ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
