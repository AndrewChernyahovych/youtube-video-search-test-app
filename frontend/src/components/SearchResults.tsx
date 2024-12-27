import React from 'react';
import { Link } from 'react-router-dom';

interface SearchResult {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {results.map((item) => (
        <div key={item.videoId} className="card border rounded-lg shadow-md overflow-hidden">
          <Link to={`/video/${item.videoId}`}>
            <img src={item.thumbnailUrl} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-sm text-gray-500">{item.publishedAt}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;