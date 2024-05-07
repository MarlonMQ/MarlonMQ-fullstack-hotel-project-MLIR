import React from 'react';

const FormButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} type="button" className="bg-secondary hover:bg-blue-700 text-white font-bold h-2/5 py-4 px-4 m-4 rounded-xl focus:outline-none focus:shadow-outline flex items-center justify-center">
      <span className="mt-2">{children}</span>
    </button>
  );
};

export default FormButton;