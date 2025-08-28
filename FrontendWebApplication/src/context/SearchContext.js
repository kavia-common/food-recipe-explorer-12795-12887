import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { storage } from '../utils/storage';
import { searchFoodItems } from '../services/api';
import { useDebounce } from '../hooks/useDebounce';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState(null);
  const [searchHistory, setSearchHistory] = useState(storage.getSearchHistory);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const addToHistory = (term) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item !== term);
      const newHistory = [term, ...filtered].slice(0, 5);
      storage.saveSearchHistory(newHistory);
      return newHistory;
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    storage.clearSearchHistory();
  };

  const handleSearch = useCallback(async (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const results = await searchFoodItems(term);
      setSearchResults(results);
      if (term.trim()) {
        addToHistory(term.trim());
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError(
        error.response?.data?.message || 
        'Failed to search food items. Please try again.'
      );
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Effect for handling debounced search
  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, handleSearch]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        isSearching,
        handleSearch,
        searchError,
        setSearchError,
        searchHistory,
        clearHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
