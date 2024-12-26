import React, { useEffect, useState } from "react";
import Preloader from "./Preloader";
import { BASE_URL } from '../utils/constants';

const RecentSearches = ({ onSearch }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const fetchVideoHistory = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/history`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        const sortedHistory = data.history.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setRecentSearches(sortedHistory.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setError("Failed to fetch video history");
        setLoading(false);
      }
    };

    fetchVideoHistory();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div
      className={`mt-0 ml-[-70px] bg-gray-800 p-4 rounded-md w-80 transition-opacity duration-300 absolute left-9 z-10`}
    >
      <h2 className="text-xl font-bold text-white">Recent Searches</h2>
      {loading ? (
        <Preloader />
      ) : (
        <ul>
          {recentSearches?.map((search, index) => (
            <li
              key={index}
              className="cursor-pointer text-gray-300 hover:bg-gray-600 p-2 rounded transition duration-200"
              onClick={() => onSearch(search.query)}
            >
              {search.query} -{" "}
              {new Date(search.timestamp)
                .toISOString()
                .replace("T", " ")
                .substring(0, 19)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentSearches;
