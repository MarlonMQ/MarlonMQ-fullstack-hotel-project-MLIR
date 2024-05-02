import React, { useContext, useEffect } from 'react'
import '../index.css'
import { AuthContext } from '../components/loginComponents/AuthContext'

 function HomePage() {
  // const { token } = useContext(AuthContext);
  
  // useEffect(() => {
  //   if (token) {
  //     // Haz algo con el token
  //     console.log(token);
  //   }
  // }, [token]); // Este efecto se ejecutará cada vez que el token cambie

  return (
    <div className='bg-violet-100 min-h-screen items-center bg-cover text-center '>
      <h1 className='primary-title text-white px-12 py-12 bg-primary'>HAZBIN HOTEL</h1>
      <h2 className='secondary-title text-white py-8 bg-secondary'>Welcome to the Hazbin Hotel</h2>
      <h3 className='tertiary-title bg-third text-white py-6'>We are excited to have you here</h3>
      <p className='primary-text bg-fourth text-white py-4'>We hope you enjoy your stay</p>
      <p className='testimony-text  bg-black text-white'> Andrea</p>

    </div>
  )
}

export default HomePage



