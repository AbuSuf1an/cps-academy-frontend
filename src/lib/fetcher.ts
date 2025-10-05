import axios from 'axios';

const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1337';
const normalizedBaseUrl = rawBaseUrl.replace(/\/$/, '');
const baseURL = normalizedBaseUrl.endsWith('/api')
  ? normalizedBaseUrl.slice(0, -4)
  : normalizedBaseUrl;

// Create axios instance with base configuration
export const fetcher = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
fetcher.interceptors.request.use(
  config => {
    // Add auth token if available (only in browser environment)
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('auth-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
fetcher.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Handle unauthorized access (browser only)
      window.localStorage.removeItem('auth-token');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

export default fetcher;
