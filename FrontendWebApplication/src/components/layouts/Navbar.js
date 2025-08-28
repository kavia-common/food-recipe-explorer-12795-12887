import React, { useState, useRef, useEffect } from 'react';
import { useSearch } from '../../context/SearchContext';
import SearchHistory from '../search/SearchHistory';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { handleSearch, searchHistory, clearHistory } = useSearch();
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef(null);
  const [localSearch, setLocalSearch] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);
    handleSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          Food Recipe Explorer
        </Link>
      </div>
      <div className="navbar-search">
        <form onSubmit={handleSubmit} className="search-box" ref={searchRef}>
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search for food items..."
            className="search-input"
            value={localSearch}
            onChange={handleInputChange}
            onFocus={() => setShowHistory(true)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
          {showHistory && searchHistory.length > 0 && (
            <SearchHistory
              history={searchHistory}
              onSelect={(term) => {
                setLocalSearch(term);
                handleSearch(term);
                setShowHistory(false);
              }}
              onClear={() => {
                clearHistory();
                setShowHistory(false);
              }}
              onClose={() => setShowHistory(false)}
            />
          )}
        </form>
      </div>
      <div className="navbar-menu">
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
        <Link to="/profile" className="nav-link">
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
