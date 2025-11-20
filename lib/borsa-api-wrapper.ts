// Wrapper for borsa-api to handle serverless environment
const BorsaAPI = require('borsa-api');

// Create a singleton instance without watchlist for serverless
let apiInstance: any = null;

export function getBorsaAPI() {
  if (!apiInstance) {
    apiInstance = new BorsaAPI();
    // Disable watchlist in serverless environment
    if (typeof window === 'undefined') {
      apiInstance.watchlist = {
        getWatchlist: () => [],
        addToWatchlist: () => ({ success: false, message: 'Watchlist not available in serverless' }),
        removeFromWatchlist: () => ({ success: false, message: 'Watchlist not available in serverless' }),
        clearWatchlist: () => ({ success: false, message: 'Watchlist not available in serverless' }),
      };
    }
  }
  return apiInstance;
}
