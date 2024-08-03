import React from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, flexRender, ColumnDef, RowData } from '@tanstack/react-table';
import PopulationFilterDropdown from './components/PopulationFilterDropdown';
import SearchBox from "./components/SearchBox";
import Clear from './components/Clear';
import ShowAllCountries from "./components/ShowAllCountry";
import useCountryInfo from './hooks/useCountryInfo'; // Import the custom hook
import './CountryInfoPage.css'; // Import the CSS file

// Define the Country type
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

// Define the column definition type
const columns: ColumnDef<Country, any>[] = [
  { accessorKey: 'name', header: 'Country Name' },
  { accessorKey: 'abbreviation', header: 'Code' },
  { accessorKey: 'capital', header: 'Capital' },
  { accessorKey: 'phone', header: 'Ph Code' },
  { accessorKey: 'population', header: 'Population' },
  {
    accessorKey: 'media.flag',
    header: 'Flag',
    cell: ({ getValue }) => (
      <img src={getValue() as string} alt="flag" style={{ width: '50px' }} />
    ),
  },
  {
    accessorKey: 'media.emblem',
    header: 'Emblem',
    cell: ({ getValue }) => (
      <img src={getValue() as string} alt="emblem" style={{ width: '50px' }} />
    ),
  },
];

const CountryInfoPage: React.FC = () => {
  const { countries, searchTerm, handleSearchText, handleClear, getAllCountries } = useCountryInfo();

  const table = useReactTable({
    data: countries,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="page-container">
      <h1>Country Info</h1>
      <ShowAllCountries getAllCountries={getAllCountries} />
      <div className="controls">
        <SearchBox value={searchTerm} onChange={handleSearchText} />
        <PopulationFilterDropdown onChange={handleClear} />
        <Clear onClick={handleClear} />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} style={{ border: '1px solid black', padding: '8px' }}>
                  {header.isPlaceholder
                    ? null
                    : (
                      <div
                        {...{
                          onClick: header.column.getToggleSortingHandler(),
                          style: { cursor: 'pointer' },
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                      </div>
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{ border: '1px solid black', padding: '8px' }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CountryInfoPage;
