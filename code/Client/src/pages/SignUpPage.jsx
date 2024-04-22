import React from 'react'
import '../index.css'


function SignUpPage() {
    return (
      <div className="flex flex-col sm:flex-row h-screen">
        <div className="w-full mb-20 sm:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className='primary-title text-black px-12 py-12'>HAZBIN HOTEL</h1>
          </div>
          <div className="bg-gray-300 rounded-lg h-3/5 w-4/5  flex-col justify-center p-8 shadow-lg shadow-gray-500">
            <h2 className="secondary-title text-center py-5">Sign Up</h2>

            <div className="items-center text-center ">
              <p>test</p>
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