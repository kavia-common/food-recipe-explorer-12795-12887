import React, { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import ErrorMessage from '../components/common/ErrorMessage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import FilterBar from '../components/filters/FilterBar';
import FoodList from '../components/food/FoodList';
import { getFoodItems } from '../services/api';

const HomePage = () => {
  const { searchResults, searchTerm, isSearching, searchError } = useSearch();
  const [foods, setFoods] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sortBy: 'rating',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      setFoods(searchResults);
    } else {
      loadFoodItems();
    }
  }, [filters, searchTerm, searchResults]);

  const loadFoodItems = async () => {
    try {
      setLoading(true);
      const data = await getFoodItems(filters);
      setFoods(data);
      setError(null);
    } catch (err) {
      setError('Failed to load food items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleSortChange = (sortValue) => {
    setFilters(prev => ({
      ...prev,
      sortBy: sortValue,
    }));
  };

  if (loading || isSearching) {
    return <LoadingSpinner />;
  }

  if (error || searchError) {
    return (
      <ErrorMessage
        message={searchError || error}
        retry={searchError ? null : loadFoodItems}
      />
    );
  }

  return (
    <div className="home-page">
      <FilterBar 
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <FoodList foods={foods} />
    </div>
  );
};

export default HomePage;
