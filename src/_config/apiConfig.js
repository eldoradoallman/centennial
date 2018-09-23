let baseUrl;
let apiUrl;

if (process.env.NODE_ENV === 'development') {
  baseUrl = process.env.REACT_APP_DEVELOPMENT_BASE_URL;
  apiUrl = process.env.REACT_APP_DEVELOPMENT_API_URL;
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = process.env.REACT_APP_PRODUCTION_BASE_URL;
  apiUrl = process.env.REACT_APP_PRODUCTION_API_URL;
}

export const BASE_URL = baseUrl;
export const API_URL = apiUrl;
