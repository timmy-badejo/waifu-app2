import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('https://api.waifu.pics/sfw/waifu')
      .then((res) => res.json())
      .then((data) => {
        const initialResults = Array(10).fill(data.url);
        setResults(initialResults);
      })
      .catch((err) => console.error('Error fetching waifus:', err));
  }, []);

  const handleSearch = () => {
    if (!query) return;
    fetch(`https://api.waifu.pics/sfw/${query}`)
      .then((res) => res.json())
      .then((data) => setResults([data.url]))
      .catch((err) => console.error('Search Error:', err));
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Waifu Search</h1>
        <input
          type="text"
          placeholder="Search Waifus (e.g., waifu, neko)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </header>
      <div className="results-container">
        {results.map((result, index) => (
          <div className="result-card" key={index}>
            <Link to={`/detail/${index}`}>
              <img src={result} alt={`Waifu ${index}`} className="result-image" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

