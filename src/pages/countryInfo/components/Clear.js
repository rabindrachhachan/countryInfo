// src/Clear.js

import React from 'react';
import './Clear.css'; // Optional: for styling

const Clear = ({ onClick }) => {
  return (
    <span 
      className="clear-text"
      onClick={onClick}
    >
      Clear
    </span>
  );
};

export default Clear;
