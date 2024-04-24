import React from 'react';

const FormBox = ({ title, type, error, value, change, blur }) => {
    return (
        <div className="relative z-0 w-full mb-5 group">
            <input 
                value={value} 
                onChange={change} 
                id={title}
                name={type} 
                type={type} 
                onBlur={blur} 
                placeholder=" "
                className={`block py-2.5 px-1 w-full text-sm text-gray-900 rounded-lg border-3 ${error ? 'border-red-500' : 'border-gray-300'} appearance-none dark:black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer left`}  />
            <label htmlFor="floating_email" className="peer-focus:font-medium absolute tertiary-titl text-sm text-gray-500 dark:black duration-300 transform -translate-y-6 scale-75 top-3 z-1 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 left-1">{title}</label>
            {error && <p className="text-red-500 text-xs pt-2">{error}</p>}
        </div>
  );
};

export default FormBox;