import axios from 'axios';
import { searchCache } from '../utils/searchCache';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchFoodItems = async (searchTerm) => {
  try {
    // Check cache first
    const cacheKey = `search:${searchTerm}`;
    const cachedResults = searchCache.get(cacheKey);
    
    if (cachedResults) {
      return cachedResults;
    }

    const response = await api.get('/food-items/search', {
      params: { q: searchTerm }
    });
    
    // Cache the results
    searchCache.set(cacheKey, response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error searching food items:', error);
    throw error;
  }
};

export const getFoodItems = async (params) => {
  try {
    const response = await api.get('/food-items', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching food items:', error);
    throw error;
  }
};

export const getFoodItemById = async (id) => {
  try {
    const response = await api.get(`/food-items/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching food item ${id}:`, error);
    throw error;
  }
};

export const submitRating = async (foodId, rating, feedback) => {
  try {
    const response = await api.post(`/food-items/${foodId}/ratings`, {
      rating,
      feedback,
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting rating:', error);
    throw error;
  }
};

export default api;
