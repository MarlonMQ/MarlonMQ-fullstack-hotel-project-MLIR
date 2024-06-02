// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const localToken = window.localStorage.getItem('authToken');
    return localToken && typeof localToken === 'string' && localToken !== 'undefined' ? JSON.parse(localToken) : null;
  });

  const [rol, setRol] = useState(() => {
    const localRol = window.localStorage.getItem('rol');
    return localRol && typeof localRol === 'string' && localRol !== 'undefined' ? JSON.parse(localRol) : null;
  });

  const login = (receivedToken,rol) => {
    setToken(receivedToken);
    setRol(rol);
    window.localStorage.setItem('authToken', JSON.stringify(receivedToken));
    window.localStorage.setItem('rol', JSON.stringify(rol));
    toast.success('You have successfully logged in');
  };

  const logout = () => {
    setToken(null);
    setRol(null);
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('rol');
    toast.info('You have been logged out');
  };

  useEffect(() => {
    if (token) {
      const timeoutId = setTimeout(logout, 60 * 60 * 1000); // Programa el cierre de sesión para después de 1 hora
      return () => clearTimeout(timeoutId); // Limpia el temporizador si el token cambia
    }
  }, [token, logout]); // Este efecto se ejecutará cada vez que el token o la función logout cambien

  return (
    <AuthContext.Provider value={{ token, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;