import React from 'react';

const AccountFormBox = ({ title, name, type, error, value, change, blur, placeholder, tabIndex, readOnly}) => {
    return (
      <div>
        <label className={`block mb-2 text-sm font-medium text-gray-900 `}>
          {title}
          {!value && <span className="text-red-500"> *</span>}
          {readOnly && <span className="text-red-500 text-sm">  (read-only)</span>}
        </label>
        <input
            value={value}
            onChange={change}
            id={title}
            name={name}
            type={type}
            onBlur={blur}
            placeholder={placeholder}
            className={`block w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded ${readOnly ? 'text-gray-400' : 'text-black'}`}
            tabIndex={tabIndex}
            readOnly={readOnly}
        />
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
      </div>
  );
};

export default AccountFormBox;