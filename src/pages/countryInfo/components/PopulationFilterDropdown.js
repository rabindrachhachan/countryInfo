// src/PopulationFilterDropdown.js

import React, { useState } from 'react';
import './PopulationFilterDropdown.css'; // Import the CSS file for styling

const PopulationFilterDropdown = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { label: '< 1M', value: 1000000 },
    { label: '< 5M', value: 5000000 },
    { label: '< 10M', value: 10000000 },
  ];

  const handleOptionClick = (value, label) => {
    setSelectedOption(label);
    setIsOpen(false);
    onChange(value);
  };

  return (
    <div className="dropdown-container">
      <div
        className="dropdown-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption || 'Filter by Population'}</span>
        <span className="dropdown-icon">{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map(option => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => handleOptionClick(option.value, option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopulationFilterDropdown;
