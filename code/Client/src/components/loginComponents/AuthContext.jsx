// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const localToken = window.localStorage.getItem('authToken');
    return localToken && typeof localToken === 'string' && localToken !== 'undefined' ? JSON.parse(localToken) : null;
  });

  const login = (receivedToken) => {
    setToken(receivedToken);
    window.localStorage.setItem('authToken', JSON.stringify(receivedToken));
  };

  const logout = () => {
    setToken(null);
    window.localStorage.removeItem('authToken');
  };

  useEffect(() => {
    if (token) {
      const timeoutId = setTimeout(logout, 60 * 60 * 1000); // Programa el cierre de sesión para después de 1 hora
      return () => clearTimeout(timeoutId); // Limpia el temporizador si el token cambia
    }
  }, [token, logout]); // Este efecto se ejecutará cada vez que el token o la función logout cambien

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;