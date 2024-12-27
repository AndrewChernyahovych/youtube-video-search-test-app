import React, { useEffect, useState } from 'react';
import Preloader from './Preloader';
import { BASE_URL } from '../utils/constants';

interface PopularSearch {
  query: string;
  count: number;
}

interface PopularSearchesProps {
  onSearch: (query: string) => void;
}

const PopularSearches: React.FC<PopularSearchesProps> = ({ onSearch }) => {
  const [popularSearches, setPopularSearches] = useState<PopularSearch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoHistory = async () => {
      try {
        const response = await fetch(`${BASE_URL}/analytics`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setPopularSearches(data.analytics);
        setLoading(false);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setError('Failed to fetch video history');
        setLoading(false);
      }
    };

    fetchVideoHistory();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Popular Searches</h2>
      <ul className="space-y-2">
        {popularSearches
          .sort((a, b) => b.count - a.count)
          .map((search, index) => (
            <li
              key={index}
              className="cursor-pointer flex justify-between items-center p-2 bg-gray-100 rounded hover:bg-gray-200 transition duration-200"
              onClick={() => onSearch(search.query)}
            >
              <span className="text-gray-800">{search.query}</span>
              <span className="text-gray-500">{search.count}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PopularSearches;