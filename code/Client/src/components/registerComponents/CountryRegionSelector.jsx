import React from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const CountryRegionSelector = ({ country, selectCountry, region, selectRegion, countryError, regionError, tabIndexCountry, tabIndexRegion }) => {
  return (
    <>
    <div className=" relative w-full mb-5 group">
      <CountryDropdown
        className={`block py-2.5 px-1 w-full text-sm text-gray-900 rounded-lg border-3 appearance-none dark:black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer left`}
        value={country}
        onChange={selectCountry}
        defaultOptionLabel = "Select a country" 
        tabIndexCountry={tabIndexCountry}
        />    
        {countryError && <p className="text-red-500 text-xs pt-2">{countryError}</p>}
    </div>
    <div className=" relative w-full mb-5 group">
      <RegionDropdown
        className={`block py-2.5 px-1 w-full text-sm text-gray-900 rounded-lg border-3 appearance-none dark:black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer left`}
        country={country}
        value={region}
        blankOptionLabel = "Select a region"
        onChange={selectRegion}
        tabIndexRegion={tabIndexRegion}
        />
        {regionError && <p className="text-red-500 text-xs pt-2">{regionError}</p>}
    </div>
    </>
  );
};

export default CountryRegionSelector;