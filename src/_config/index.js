let base_url;
let api_url;

if (process.env.NODE_ENV === 'development') {
  base_url = process.env.REACT_APP_DEVELOPMENT_BASE_URL;
  api_url = process.env.REACT_APP_DEVELOPMENT_API_URL;
} else if (process.env.NODE_ENV === 'production') {
  base_url = process.env.REACT_APP_PRODUCTION_BASE_URL;
  api_url = process.env.REACT_APP_PRODUCTION_API_URL;
}

export const BASE_URL = base_url;
export const API_URL = api_url;
