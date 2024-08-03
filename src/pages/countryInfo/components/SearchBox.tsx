import React from 'react';
import './SearchBox.css'; // Optional: for styling

// Define the interface for the component props
interface SearchBoxProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by country name"
      value={value}
      onChange={onChange}
      className="search-box" // Optional: for styling
    />
  );
};

export default SearchBox;