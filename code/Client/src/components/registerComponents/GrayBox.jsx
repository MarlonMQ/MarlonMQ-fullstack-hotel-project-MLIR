import React from 'react';
import { Link } from 'react-router-dom';
import FormButton from './FormButton';

const GrayBox = ({ title, buttonText, hrefLink, hrefText, onButtonClick, children }) => {
  return (
    <div className="flex flex-col gap-4  bg-gray-300 rounded-lg justify-center p-8 shadow-lg shadow-gray-500">
      <h2 className="secondary-title text-center">{title}</h2>

      <div> 
        {/* Form */}
        {children}
      </div>    
        {/* Button at the end */}
        <FormButton onClick={onButtonClick}>{buttonText}</FormButton>

        {/* Terms and conditions */}
        <div className="text-center pt-3">
          <p className="mb-2 text-xs text-gray-500">By continuing, you accept the Privacy Policy and Terms of Use</p>
        </div>

        {/* Option to go to another page */}
        <Link to={hrefLink} className="text-center text-blue-500 hover:underline">{hrefText}</Link>
    </div>
  );
};

export default GrayBox;