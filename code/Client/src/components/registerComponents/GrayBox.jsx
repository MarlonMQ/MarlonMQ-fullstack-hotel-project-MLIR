import React from 'react';
import FormButton from './FormButton'; // Make sure to import the FormButton component

const GrayBox = ({ title, paragraph, buttonText, hrefLink, hrefText }) => {
  return (
    <div className="bg-gray-300 rounded-lg h-4/5 w-4/5 grid grid-rows-3 justify-center p-8 shadow-lg shadow-gray-500">
      <h2 className="secondary-title text-center py-5">{title}</h2>

      <div className="flex flex-col justify-center items-center "> 
        {/* Form */}
        <p>{paragraph}</p>
      </div>

      <div className="flex flex-col items-center justify-center"> 
      
        {/* Botón al final */}
        <FormButton onClick={() => console.log('Button clicked')} children={buttonText}></FormButton>

        {/* Términos y condiciones */}
        <div className="text-center pt-3">
          <p className="mb-2 text-xs text-gray-500">Al continuar, aceptas la Política de privacidad y los Términos de uso</p>
        </div>



        {/* Opción para ir a otra página */}
        <a href={hrefLink} className="text-sm text-blue-500 hover:underline">{hrefText}</a>
      </div>
    </div>
  );
};

export default GrayBox;