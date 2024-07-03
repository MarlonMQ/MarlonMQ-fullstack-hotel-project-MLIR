import React, { createContext, useState, useEffect, useContext } from 'react';
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

  const [profileImage, setProfileImage] = useState(() => {
    const localProfileImage = window.localStorage.getItem('profileImage');
    return localProfileImage && typeof localProfileImage === 'string' && localProfileImage !== 'undefined' ? localProfileImage : null;
  });

  const login = (receivedToken, rol, profileImage) => {
    setToken(receivedToken);
    setRol(rol);
    let base64Image = undefined;
    if (profileImage) {
      base64Image = btoa(
        new Uint8Array(profileImage.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
    }
    setProfileImage(base64Image);
    window.localStorage.setItem('authToken', JSON.stringify(receivedToken));
    window.localStorage.setItem('rol', JSON.stringify(rol));
    window.localStorage.setItem('profileImage', base64Image);
    toast.success('You have successfully logged in');
  };

  const updateProfileImage = (newProfileImage) => {
    let base64Image = undefined;
    if (newProfileImage) {
      base64Image = btoa(
        new Uint8Array(newProfileImage.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
    }
    setProfileImage(base64Image);
    window.localStorage.setItem('profileImage', base64Image);
    toast.success('Profile image updated successfully');
  };

  const logout = () => {
    setToken(null);
    setRol(null);
    setProfileImage(null);
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('rol');
    window.localStorage.removeItem('profileImage');
    toast.info('You have been logged out');
  };

  useEffect(() => {
    if (token) {
      const timeoutId = setTimeout(logout, 60 * 60 * 1000); // Programa el cierre de sesión para después de 1 hora
      return () => clearTimeout(timeoutId); // Limpia el temporizador si el token cambia
    }
  }, [token, logout]); // Este efecto se ejecutará cada vez que el token o la función logout cambien

  return (
    <AuthContext.Provider value={{ token, rol, login, logout, profileImage, updateProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
