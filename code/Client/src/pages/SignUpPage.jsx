import React from 'react'
import '../index.css'


function SignUpPage() {
    return (
      <div className="flex flex-col sm:flex-row h-screen min-w-max">
        <div className="w-full sm:w-1/2 bg-white p-8 flex flex-col justify-center items-center relative">
          <div className="text-center">
            <h1 className='primary-title text-black px-12 py-4'>HAZBIN HOTEL</h1>
            <h2 className="secondary-title text-black py-8">Sign Up</h2>
          </div>
          <div className="bg-gray-300 rounded-lg h-3/4 sm:w-3/5 flex justify-center items-center shadow-2xl p-8">
            <form className="flex flex-col space-y-4 w-full">
              <input className="px-4 py-2 rounded bg-white" type="text" placeholder="Nombre" />
              <input className="px-4 py-2 rounded bg-white" type="text" placeholder="Apellidos" />
              <input className="px-4 py-2 rounded bg-white" type="email" placeholder="Correo Electrónico" />
              <input className="px-4 py-2 rounded bg-white" type="date" placeholder="Fecha de Nacimiento" />
              <input className="px-4 py-2 rounded bg-white" type="password" placeholder="Contraseña" />
              <input className="px-4 py-2 rounded bg-white" type="text" placeholder="Nacionalidad" />
              <input className="px-4 py-2 rounded bg-white" type="tel" placeholder="Teléfono" />
              <input className="px-4 py-2 rounded bg-white" type="text" placeholder="Dirección" />
              <input className="px-4 py-2 rounded bg-white" type="text" placeholder="Estado" />
              <input className="px-4 py-2 rounded bg-white" type="text" placeholder="País" />
              <button type="submit" className="bg-white text-blue-500 px-4 py-2 rounded mt-4">Registrarse</button>
            </form>
          </div>
        </div>
  
        <div className="hidden sm:block sm:w-1/2 justify-center items-center">
          <img
            src={'src/assets/images/fachada.jpg'}
            alt="Imagen"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    );
  }
  
  export default SignUpPage;