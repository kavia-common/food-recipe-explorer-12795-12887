import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { getFoodItemById, submitRating } from '../services/api';

const FoodDetailPage = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    loadFoodItem();
  }, [id]);

  const loadFoodItem = async () => {
    try {
      setLoading(true);
      const data = await getFoodItemById(id);
      setFood(data);
      setError(null);
    } catch (err) {
      setError('Failed to load food item details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitStatus('submitting');
      await submitRating(id, userRating, feedback);
      setSubmitStatus('success');
      setFeedback('');
      loadFoodItem(); // Reload food item to get updated ratings
    } catch (err) {
      setSubmitStatus('error');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!food) {
    return <div className="not-found">Food item not found</div>;
  }

  return (
    <div className="food-detail-page">
      <div className="food-detail-content">
        <img src={food.image} alt={food.name} className="food-detail-image" />
        <div className="food-detail-info">
          <h1 className="food-detail-name">{food.name}</h1>
          <p className="food-detail-price">${food.price}</p>
          <p className="food-detail-location">{food.location}</p>
          <div className="food-detail-rating">
            <ReactStars
              count={5}
              value={food.rating}
              size={24}
              activeColor="#ffd700"
              edit={false}
            />
            <span className="rating-count">({food.ratingCount} reviews)</span>
          </div>
          <p className="food-detail-description">{food.description}</p>
        </div>
      </div>

      <div className="rating-section">
        <h2>Rate this food item</h2>
        <form onSubmit={handleRatingSubmit}>
          <div className="rating-input">
            <ReactStars
              count={5}
              value={userRating}
              size={32}
              activeColor="#ffd700"
              onChange={setUserRating}
            />
          </div>
          <div className="feedback-input">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your experience (optional)"
              rows={4}
            />
          </div>
          <button 
            type="submit" 
            className="submit-rating-btn"
            disabled={submitStatus === 'submitting' || !userRating}
          >
            Submit Rating
          </button>
          {submitStatus === 'success' && (
            <p className="success-message">Thank you for your rating!</p>
          )}
          {submitStatus === 'error' && (
            <p className="error-message">Failed to submit rating. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FoodDetailPage;
