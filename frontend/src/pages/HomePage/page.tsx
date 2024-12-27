import React, { useState, useCallback, useEffect } from "react";
import SearchInput from "../../components/SearchInput";
import SearchResults from "../../components/SearchResults";
import PopularSearches from "../../components/PopularSearches";
import Preloader from "../../components/Preloader";
import { BASE_URL } from '../../utils/constants';
import { useSearch } from "../../context/SearchContext";

const HomePage: React.FC = () => {
  const { addSearch } = useSearch() as { addSearch: (searchQuery: string) => void };
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [prevPageToken, setPrevPageToken] = useState<string | undefined>();
  const [currentPageToken, setCurrentPageToken] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [query, setQuery] = useState<string>(() => {
    return localStorage.getItem("searchQuery") || "";
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem("searchResults");
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("searchQuery", query);
  }, [query]);

  const handleSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    addSearch(searchQuery);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(searchQuery)}&pageToken=${nextPageToken}&maxResults=3`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults(data.results);
      setNextPageToken(data.nextPageToken);
      setPrevPageToken(data.prevPageToken);
      setCurrentPageToken(null);

      localStorage.setItem("searchResults", JSON.stringify(data.results));
    } catch (error) {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [nextPageToken, addSearch]);

  const handleNextPage = useCallback(async () => {
    if (nextPageToken) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}&pageToken=${nextPageToken}&maxResults=3`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResults(data.results);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        setCurrentPageToken(nextPageToken);
      } catch (error) {
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }, [nextPageToken, query]);

  const handlePrevPage = useCallback(async () => {
    if (prevPageToken) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}&pageToken=${prevPageToken}&maxResults=3`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setResults(data.results);
        setNextPageToken(data.nextPageToken);
        setPrevPageToken(data.prevPageToken);
        setCurrentPageToken(prevPageToken);
      } catch (error) {
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }, [prevPageToken, query]);

  return (
    <div className="HomePage">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <SearchInput onSearch={handleSearch} />
          <PopularSearches onSearch={handleSearch} />
          {error && <div className="text-red-500 text-center">{error}</div>}
          {Array.isArray(results) && results.length > 0 ? (
            <SearchResults results={results} />
          ) : (
            <div className="text-center text-gray-500">No results found.</div>
          )}
          {results && results.length > 0 && (
            <div className="pagination flex justify-center space-x-4 mt-4">
              <button
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handlePrevPage}
                disabled={!prevPageToken}
              >
                Previous
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleNextPage}
                disabled={!nextPageToken}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;