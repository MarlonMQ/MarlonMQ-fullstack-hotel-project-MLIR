import React from 'react';

const RoleSelector = ({ value, handleChange, error, tabIndex }) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">Role</label>
      <select
        name="rol"
        value={value}
        onChange={handleChange}
        className={`block w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
        tabIndex={tabIndex}
      >
        <option value="user">Client</option>
        <option value="employee">Employee</option>
      </select>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default RoleSelector;