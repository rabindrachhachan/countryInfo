import React, { useState } from 'react';
import './PopulationFilterDropdown.css'; // Import the CSS file for styling

// Define the interface for the component props
interface PopulationFilterDropdownProps {
  onChange: (value: number) => void;
}

// Define the interface for the options
interface Option {
  label: string;
  value: number;
}

const PopulationFilterDropdown: React.FC<PopulationFilterDropdownProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const options: Option[] = [
    { label: '< 1M', value: 1000000 },
    { label: '< 5M', value: 5000000 },
    { label: '< 10M', value: 10000000 },
  ];

  const handleOptionClick = (value: number, label: string) => {
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
