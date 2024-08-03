import React from 'react';
import './ShowAllCountry.css'; // Optional: for styling

// Define the interface for the component props
interface ShowAllCountriesProps {
  getAllCountries: () => void;
}

const ShowAllCountries: React.FC<ShowAllCountriesProps> = ({ getAllCountries }) => {
  const handleClick = () => {
    getAllCountries();
  };

  return (
    <button onClick={handleClick} className="show-all-button">
      Show All Countries
    </button>
  );
};

export default ShowAllCountries;
