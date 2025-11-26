import React from 'react';
import './SelectField.css';

const SelectField = ({ label, name, options, register }) => {
  return (
    <div className="select-field-container">
      <label className="select-label">{label}</label>
      <select {...register(name, { required: true })} className="select-element">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
