import React, { useContext, useEffect } from 'react';
import '../index.css';
import { AuthContext } from '../components/loginComponents/AuthContext.jsx';

function HomePage() {

  const { rol, logout } = useContext(AuthContext);

  return (
    <>
    </>
  )
}

export default HomePage;
