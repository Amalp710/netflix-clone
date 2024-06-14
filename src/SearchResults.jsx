import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // You may need to install axios: npm install axios
import { API_KEY } from './constants/constants';
import './SearchResults.css';

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: API_KEY,
            query: decodeURIComponent(query), // Decode query parameter
          },
        });
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [query]); // Dependency on query parameter

  return (
    <div className="search-results-container">
      <h2>Search Results for: {query}</h2>
      <ul className="search-results-list">
        {searchResults.map(movie => (
          <li key={movie.id} className="search-result-item">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="movie-poster"
              />
            )}
            <p className="movie-title">{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
