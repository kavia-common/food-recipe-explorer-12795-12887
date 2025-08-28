import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

const FilterBar = ({ onFilterChange, onSortChange }) => {
  return (
    <div className="filter-bar">
      <div className="filter-section">
        <FontAwesomeIcon icon={faFilter} className="filter-icon" />
        <select
          className="filter-select"
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="main">Main Course</option>
          <option value="appetizer">Appetizer</option>
          <option value="dessert">Dessert</option>
          <option value="beverage">Beverage</option>
        </select>
        
        <select
          className="filter-select"
          onChange={(e) => onFilterChange('priceRange', e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="low">$ (Under $10)</option>
          <option value="medium">$$ ($10-$30)</option>
          <option value="high">$$$ (Over $30)</option>
        </select>
      </div>
      
      <div className="sort-section">
        <FontAwesomeIcon icon={faSortAmountDown} className="sort-icon" />
        <select
          className="sort-select"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="rating">Rating (High to Low)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
