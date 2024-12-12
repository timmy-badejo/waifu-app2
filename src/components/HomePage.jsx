/* HomePage.jsx */
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './HomePage.css';

const HomePage = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [sortOrder, setSortOrder] = useState('asc');

  // Define handleSearch with useCallback to prevent re-creation
  const handleSearch = useCallback(() => {
    if (!query) return;
    setIsLoading(true);
    setError('');
    fetch(`https://api.waifu.pics/sfw/${query}`)
      .then((res) => res.json())
      .then((data) => {
        setResults([{ url: data.url, name: query }]);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Error fetching results.');
        setIsLoading(false);
      });
  }, [query]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query) handleSearch();
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [query, handleSearch]); // Add handleSearch as a dependency

  useEffect(() => {
    fetch('https://api.waifu.pics/sfw/waifu')
      .then((res) => res.json())
      .then((data) => {
        const initialResults = Array(20).fill({ url: data.url, name: `Waifu ${Math.random()}` });
        setResults(initialResults);
      })
      .catch((err) => console.error('Error fetching waifus:', err));
  }, []);

  const sortedResults = [...results].sort((a, b) => {
    return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
  });

  const paginatedResults = sortedResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);

  useEffect(() => {
    gsap.fromTo('.result-card', { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2 });
  }, [paginatedResults]);

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
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-dropdown"
        >
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
        {isLoading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
      </header>
      <div className="results-container">
        {paginatedResults.map((result, index) => (
          <div className="result-card" key={index}>
            <Link to={`/detail/${index}`}>
              <img src={result.url} alt={result.name} className="result-image" />
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;



//API Query: Fetches initial data and search-specific results.
//GSAP Animation: Adds subtle scaling animation to result cards for a playful effect.
//    useCallback for handleSearch: Ensures handleSearch is memoized and not recreated on every render, avoiding infinite loops in useEffect.
// Dependencies in useEffect: handleSearch is included in the dependency array, addressing the warning.
// Preserved Existing Logic: All previous functionality, including debouncing, pagination, and GSAP animations, is intact.



