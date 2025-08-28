const STORAGE_KEYS = {
  SEARCH_HISTORY: 'food-explorer:search-history',
};

export const storage = {
  getSearchHistory: () => {
    try {
      const history = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  },

  saveSearchHistory: (history) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  },

  clearSearchHistory: () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  },
};
