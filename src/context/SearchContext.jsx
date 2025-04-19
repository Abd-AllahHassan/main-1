import React, { createContext, useState, useContext } from 'react';

// Create the SearchContext
const SearchContext = createContext();

// Create a provider component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the search context
export const useSearch = () => {
  return useContext(SearchContext);
};
