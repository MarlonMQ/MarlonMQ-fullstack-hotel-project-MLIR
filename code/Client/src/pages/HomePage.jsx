import React, { useContext, useEffect } from 'react';
import '../index.css';
import { AuthContext } from '../components/loginComponents/AuthContext.jsx';

function HomePage() {

  const { token, logout } = useContext(AuthContext);

  return (
    <>
      {/* It is necessary to have the same number of mobile images as desktop images */}
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default HomePage;
