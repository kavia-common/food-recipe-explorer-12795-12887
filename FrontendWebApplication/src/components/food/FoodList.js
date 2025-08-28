import React from 'react';
import FoodItem from './FoodItem';

const FoodList = ({ foods }) => {
  if (!foods || foods.length === 0) {
    return (
      <div className="no-results">
        <p>No food items found. Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="food-list">
      {foods.map(food => (
        <FoodItem key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodList;
