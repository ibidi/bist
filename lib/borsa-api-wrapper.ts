// Wrapper for borsa-api with serverless support
const BorsaAPI = require('borsa-api');

let apiInstance: any = null;

export function getBorsaAPI() {
  if (!apiInstance) {
    apiInstance = new BorsaAPI();
  }
  return apiInstance;
}
