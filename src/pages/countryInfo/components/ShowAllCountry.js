// src/ShowAllCountries.js

import React from 'react';
import axios from 'axios';
import './ShowAllCountry.css'; // Optional: for styling

const ShowAllCountries = ({ getAllCountries }) => {
  const handleClick = () => {
    getAllCountries()
  };

  return (
    <button onClick={handleClick} className="show-all-button">
      Show All Countries
    </button>
  );
};

export default ShowAllCountries;
