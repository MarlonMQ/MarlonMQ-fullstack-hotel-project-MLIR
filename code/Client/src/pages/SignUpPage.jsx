import React from 'react'
import FormButton from '../components/registerComponents/FormButton'


function SignUpPage() {
    return (
      <div className="flex flex-col sm:flex-row h-screen">
        <div className="w-full mb-20 sm:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className='primary-title text-black px-12 py-12'>HAZBIN HOTEL</h1>
          </div>
          <div className="bg-gray-300 rounded-lg h-4/5 w-4/5 grid grid-rows-3 justify-center p-8 shadow-lg shadow-gray-500">
            <h2 className="secondary-title text-center py-5">Sign Up</h2>

            <div className="flex flex-col justify-center items-center"> 
            {/* Form */}
              <p>test</p>
            </div>

            <div className="flex flex-col items-center justify-center"> 
              {/* Botón al final */}
              <FormButton onClick={() => console.log('Button clicked')} children="Continuar"></FormButton>

              {/* Opción para aceptar términos y condiciones */}
              <label className="flex items-center pt-5">
                <input type="checkbox" className="form-checkbox mr-2" />
                <span className="text-sm">Acepto los términos y condiciones</span>
              </label>

              {/* Opción para ir a otra página */}
              <a href="/otra-pagina" className="text-sm text-blue-500 hover:underline">¿Ya tienes una cuenta? Inicia sesión</a>
            </div>

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