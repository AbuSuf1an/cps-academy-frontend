import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:1337';
// Ensure base URL never double-includes the `/api` prefix
const normalizedBaseUrl = rawBaseUrl.replace(/\/$/, '');
const baseURL = normalizedBaseUrl.endsWith('/api')
  ? normalizedBaseUrl.slice(0, -4)
  : normalizedBaseUrl;

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized - maybe redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        // Could redirect to login page here
      }
    }
    return Promise.reject(error);
  }
);

// Typed fetch functions
export const fetcher = {
  // GET request
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.get<T>(url, config);
  },

  // POST request
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.post<T>(url, data, config);
  },

  // PUT request
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.put<T>(url, data, config);
  },

  // PATCH request
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.patch<T>(url, data, config);
  },

  // DELETE request
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return api.delete<T>(url, config);
  },
};

// Convenience function for Strapi API calls
export const strapiApi = {
  // Get courses with full population
  async getCourses() {
    const populateQuery = 'populate[modules][populate][classes][populate]=topics&populate[thumbnail]=*';
    return fetcher.get(`/api/courses?${populateQuery}`);
  },

  // Get single course by slug
  async getCourseBySlug(slug: string) {
    const populateQuery = 'populate[modules][populate][classes][populate]=topics&populate[thumbnail]=*';
    const response = await fetcher.get(`/api/courses?filters[slug][$eq]=${slug}&${populateQuery}`);
    
    // Return first course from results or null
    const courses = response.data.data;
    return courses.length > 0 ? { ...response, data: { data: courses[0] } } : null;
  },

  // Get course by ID
  async getCourseById(id: number) {
    const populateQuery = 'populate[modules][populate][classes][populate]=topics&populate[thumbnail]=*';
    return fetcher.get(`/api/courses/${id}?${populateQuery}`);
  },

  // Get modules for a course
  async getModulesByCourseId(courseId: number) {
    const populateQuery = 'populate[classes][populate]=topics';
    return fetcher.get(`/api/modules?filters[course][id][$eq]=${courseId}&${populateQuery}`);
  },

  // Get classes for a module
  async getClassesByModuleId(moduleId: number) {
    const populateQuery = 'populate=topics';
    return fetcher.get(`/api/classes?filters[module][id][$eq]=${moduleId}&${populateQuery}`);
  },

  // Get single class by ID
  async getClassById(id: number) {
    const populateQuery = 'populate=topics';
    return fetcher.get(`/api/classes/${id}?${populateQuery}`);
  },
};

export default api;
