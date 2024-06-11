import React from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const AccountCountryRegionSelector = ({ country, selectCountry, region, selectRegion, countryError, regionError, tabIndexCountry, tabIndexRegion }) => {
  return (
    <div className="flex flex-wrap">
      <div className="block mb-2 w-1/2 pr-2">
      <label className="block mb-2 text-sm font-medium text-gray-900 w-1/2 pr-2">Country</label>
      <CountryDropdown
        className={`block w-full p-3 border ${countryError ? 'border-red-500' : 'border-gray-300'} rounded`}
        value={country}
        onChange={selectCountry}
        defaultOptionLabel = "Select a country" 
        tabIndex={tabIndexCountry}
        />    
        {countryError && <p className="text-red-500 text-xs italic">{countryError}</p>}
      </div>
      <div className="block mb-2 w-1/2  pl-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 w-1/2 pr-2">Region</label>
        <RegionDropdown
          className={`block w-full p-3 border ${regionError ? 'border-red-500' : 'border-gray-300'} rounded`}
          country={country}
          value={region}
          blankOptionLabel = "Select a region"
          onChange={selectRegion} 
          tabIndex={tabIndexRegion}
          />
          {regionError && <p className="text-red-500 text-xs italic">{regionError}</p>}

      </div>
    </div>
  );
};

export default AccountCountryRegionSelector;