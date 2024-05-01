import React from 'react';
import { Link } from 'react-router-dom';
import FormButton from './FormButton';

const GrayBox = ({ title, buttonText, hrefLink, hrefText, onButtonClick, children }) => {
  return (
    <div className="bg-gray-300 rounded-lg h-4/5 w-4/5 min-w-[300px] min-h-[400px] grid grid-rows-3 justify-center p-8 shadow-lg shadow-gray-500">
      <h2 className="secondary-title text-center">{title}</h2>

      <div className="flex flex-col justify-center items-center mb-10"> 
        {/* Form */}
        {children}
      </div>

      <div className="flex flex-col items-center justify-center"> 
      
        {/* Botón al final */}
        <FormButton onClick={onButtonClick}>{buttonText}</FormButton>

        {/* Términos y condiciones */}
        <div className="text-center pt-3">
          <p className="mb-2 text-xs text-gray-500">Al continuar, aceptas la Política de privacidad y los Términos de uso</p>
        </div>

        {/* Opción para ir a otra página */}
        <Link to={hrefLink} className="text-sm text-blue-500 hover:underline">{hrefText}</Link>
      </div>
    </div>
  );
};

export default GrayBox;