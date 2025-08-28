const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

class SearchCache {
  constructor() {
    this.cache = new Map();
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > CACHE_EXPIRY) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });

    // Clean up old entries
    this.cleanup();
  }

  cleanup() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > CACHE_EXPIRY) {
        this.cache.delete(key);
      }
    }
  }
}

export const searchCache = new SearchCache();
