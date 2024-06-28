import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext.jsx';

const ProtectedRoute = ({ requiredRole }) => {
  const { rol, token } = useContext(AuthContext);

  // Check if user is logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If a specific role is required, check for that role
  if (requiredRole && rol !== requiredRole) {
    return <Navigate to="/"/>;
  }

  // If all checks pass, render the children routes
  return <Outlet />;
};

export default ProtectedRoute;
