import React, { useEffect, useRef, useState } from 'react';
import RecentSearches from './RecentSearches';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false);
  const recentSearchesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      setQuery(savedQuery);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    localStorage.setItem("searchQuery", query);
    if (query.trim() === '') return;
    onSearch(query);
    setShowRecentSearches(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      recentSearchesRef.current &&
      !recentSearchesRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setShowRecentSearches(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRecentSearchSelect = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch(searchQuery);
    setShowRecentSearches(false);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex p-2 rounded-md">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          onFocus={() => setShowRecentSearches(true)}
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-md w-80 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={inputRef}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
      {showRecentSearches && (
        <div className="relative w-80" ref={recentSearchesRef}>
          <RecentSearches onSearch={handleRecentSearchSelect} />
          <button
            onClick={() => setShowRecentSearches(false)}
            className="absolute top-3 right-9 z-10 mt-2 mr-2 text-red-500"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchInput;