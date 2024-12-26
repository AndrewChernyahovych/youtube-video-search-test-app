import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }) => {
  const [recentSearches, setRecentSearches] = useState([]);

  const addSearch = (query) => {
    const updatedSearches = recentSearches.filter(search => search.query !== query);
    
    const newSearches = [{ query, timestamp: new Date() }, ...updatedSearches];
    const limitedSearches = newSearches.slice(0, 10);

    setRecentSearches(limitedSearches);
  };


  return (
    <SearchContext.Provider value={{ recentSearches, addSearch}}>
      {children}
    </SearchContext.Provider>
  );
}; 