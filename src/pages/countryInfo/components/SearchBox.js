// src/Components/SearchBox.js

import React from 'react';
import './SearchBox.css'; // Optional: for styling

const SearchBox = ({ value, onChange }) => {
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
