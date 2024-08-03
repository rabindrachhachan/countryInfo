// src/hooks/useCountryInfo.js

import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const useCountryInfo = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPopulation, setMinPopulation] = useState('');

  useEffect(() => {
    // getAllCountries()
  }, []);

  const getAllCountries =()=>{
    if(searchTerm) setSearchTerm('');
    if(minPopulation) setMinPopulation('')

    axios.get('https://api.sampleapis.com/countries/countries')
    .then((response) => {
      setCountries(response.data);
    })
    .catch((error) => console.error('Error fetching data:', error));

  }



  const filteredData = useMemo(() => {
    return countries.filter(country => {
      const matchesSearchTerm = searchTerm
        ? country.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesPopulation = minPopulation
        ? country.population < minPopulation
        : true;

      return matchesSearchTerm && matchesPopulation;
    });
  }, [countries, searchTerm, minPopulation]);

  const handleSearchText = (e) =>{
    if( minPopulation) setMinPopulation('')
    setSearchTerm(e.target.value)
  } 

  const handleClear =()=>{
    setSearchTerm('');
    setMinPopulation('')

  }

  const onFilter =(value)=>{
    if(searchTerm) setSearchTerm('')
    setMinPopulation(value)
  }

  return {
    countries: filteredData,
    searchTerm,
    handleSearchText,
    handleClear,
    getAllCountries
  };
};

export default useCountryInfo;
