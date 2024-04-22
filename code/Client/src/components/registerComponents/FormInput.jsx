import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ label, type, name, value, onChange, placeholder }) => (
  <div>
    {label && <label htmlFor={name}>{label}</label>}
    <input
      type={type}
      className="form-control"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

FormInput.defaultProps = {
  label: '',
  placeholder: '',
};

export default FormInput;