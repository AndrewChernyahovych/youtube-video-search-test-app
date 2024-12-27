import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Search {
  query: string;
  timestamp: Date;
}

interface SearchContextType {
  recentSearches: Search[];
  addSearch: (query: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  return useContext(SearchContext);
};

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recentSearches, setRecentSearches] = useState<Search[]>([]);

  const addSearch = (query: string): void => {
    const updatedSearches = recentSearches.filter(search => search.query !== query);
    const newSearches = [{ query, timestamp: new Date() }, ...updatedSearches];
    const limitedSearches = newSearches.slice(0, 10);
    setRecentSearches(limitedSearches);
  };

  return (
    <SearchContext.Provider value={{ recentSearches, addSearch }}>
      {children}
    </SearchContext.Provider>
  );
}; 