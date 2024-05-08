import React, { useContext, useEffect } from 'react';
import '../index.css';
import { AuthContext } from '../components/loginComponents/AuthContext.jsx';



function HomePage() {

  const { token,logout } = useContext(AuthContext);

  return (
    <>


      {/* Es necesario que haya la misma cantidad de mobile images que desktop images */}

      <button onClick={logout}>Logout</button>



    </>

  )
}

export default HomePage;
