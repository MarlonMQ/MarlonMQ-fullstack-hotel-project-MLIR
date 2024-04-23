import React from 'react'
import GrayBox from '../components/registerComponents/GrayBox';



function SignUpPage() {
    return (
      <div className="flex flex-col sm:flex-row h-screen">
        <div className="w-full mb-20 sm:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className='primary-title text-black px-12 py-12'>HAZBIN HOTEL</h1>
          </div>

          <GrayBox
            title="Sign Up"
            paragraph="test" 
            buttonText="Continuar"
            hrefLink="/SignIn"
            hrefText="¿Ya tienes una cuenta? Inicia sesión"
          />
          

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