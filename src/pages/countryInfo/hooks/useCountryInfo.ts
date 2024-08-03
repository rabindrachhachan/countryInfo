import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// Define the structure of the country object based on the API response
interface Country {
  name: string;
  abbreviation: string;
  capital: string;
  phone: string;
  population: number;
  media: {
    flag: string;
    emblem: string;
  };
}


// Define the return type of the hook
interface UseCountryInfoReturn {
  countries: Country[];
  searchTerm: string;
  handleSearchText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  getAllCountries: () => void;
  onFilter: (value: string) => void;
}

const useCountryInfo = (): UseCountryInfoReturn => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [minPopulation, setMinPopulation] = useState<string>('');

  useEffect(() => {
    // Uncomment if needed
    // getAllCountries();
  }, []);

  const getAllCountries = () => {
    if (searchTerm) setSearchTerm('');
    if (minPopulation) setMinPopulation('');

    axios.get<Country[]>('https://api.sampleapis.com/countries/countries')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const filteredData = useMemo(() => {
    return countries.filter(country => {
      const matchesSearchTerm = searchTerm
        ? country.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesPopulation = minPopulation
        ? country.population < parseInt(minPopulation, 10)
        : true;

      return matchesSearchTerm && matchesPopulation;
    });
  }, [countries, searchTerm, minPopulation]);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (minPopulation) setMinPopulation('');
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setMinPopulation('');
  };

  const onFilter = (value: string) => {
    if (searchTerm) setSearchTerm('');
    setMinPopulation(value);
  };

  return {
    countries: filteredData,
    searchTerm,
    handleSearchText,
    handleClear,
    getAllCountries,
    onFilter
  };
};

export default useCountryInfo;
