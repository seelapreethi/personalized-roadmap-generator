// src/components/InputField.js
import React from 'react';

const InputField = ({ label, type, value, onChange, name }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

export default InputField;
