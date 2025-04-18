import { useState } from "react";
import { AsyncPaginate, validateResponse } from "react-select-async-paginate";
import { GEO_API_URL } from "src/api";
import { geoApiOptions } from "src/api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  return (
    <AsyncPaginate
      placeholder="Pesquise cidades"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          color: "white",
          borderColor: "white",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          color: "white",
        }),
        option: (baseStyles, { isFocused, isSelected }) => ({
          ...baseStyles,
          backgroundColor: isSelected
            ? "#65a6fc"
            : isFocused
            ? "#65a6fc" // cor ao passar o mouse
            : "white",
          color: isSelected || isFocused ? "white" : "black",
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          zIndex: 9999,
        }),
      }}
    />
  );
};

export default Search;
