import React, { useState } from 'react';
import GrayBox from '../components/registerComponents/GrayBox';

function SignUpPage() {
  const [isFirstDivVisible, setIsFirstDivVisible] = useState(true);
  const [email, setEmail] = useState("");

  const handleButtonClick = () => {
      if (email.trim() === "" || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
          alert("Por favor, introduce un correo electrónico válido.");
          return;
      }
      setIsFirstDivVisible(false);
  }

  const handleEmailChange = (e) => {
      setEmail(e.target.value);
  }

    return (
      <div className="flex flex-col sm:flex-row h-screen">
        <div className="w-full mb-20 sm:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className='primary-title text-black px-12 py-12'>HAZBIN HOTEL</h1>
          </div>

          <GrayBox
            title="Sign Up"
            buttonText="Continuar"
            hrefLink="/SignIn"
            hrefText="¿Ya tienes una cuenta? Inicia sesión"
            onButtonClick={handleButtonClick}
          >
            <form className="max-w-md mx-auto">
              {isFirstDivVisible ? (
                <div className="relative z-0 w-full mb-5 group">
                  <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-1 w-60 text-sm text-gray-900  rounded-lg border-3 border-gray-300 appearance-none dark:black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer left" placeholder=" " required />
                  <label htmlFor="floating_email" className="peer-focus:font-medium absolute tertiary-titl text-sm text-black dark:black duration-300 transform -translate-y-6 scale-75 top-3 z-1 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 left-1">Email address</label>
                </div>
              ) : (
                <div>

                </div>
                
                
              )}
            </form>
          </GrayBox>
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