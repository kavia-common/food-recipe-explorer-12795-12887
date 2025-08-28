import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const FoodItem = ({ food }) => {
  return (
    <div className="food-item">
      <img src={food.image} alt={food.name} className="food-image" />
      <div className="food-content">
        <h3 className="food-name">
          <Link to={`/food/${food.id}`}>{food.name}</Link>
        </h3>
        <p className="food-price">${food.price}</p>
        <p className="food-location">{food.location}</p>
        <div className="food-rating">
          <ReactStars
            count={5}
            value={food.rating}
            size={24}
            activeColor="#ffd700"
            edit={false}
          />
          <span className="rating-count">({food.ratingCount} reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
