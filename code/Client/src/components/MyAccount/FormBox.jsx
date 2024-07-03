import React from 'react';

const FormBox = ({ title, name, type, error, value, change, blur, placeholder, tabIndex, readOnly, required}) => {
    return (
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {title}
          {required && <span className="text-red-500"> *</span>}
        </label>
          <input
              value={value}
              onChange={change}
              id={title}
              name={name}
              type={type}
              onBlur={blur}
              placeholder={placeholder}
              className={`block w-full h-12 p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
              tabIndex={tabIndex}
              readOnly={readOnly}
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
  );
};

export default FormBox;