import React from 'react';

const FormButton = ({ onClick, children }) => {
  return (
    <button onClick={onClick} type="button" className="bg-secondary hover:bg-blue-700 text-white font-bold h-2/5 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      {children}
    </button>
  );
};

export default FormButton;