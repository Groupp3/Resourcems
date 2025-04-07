import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // Base URL for authentication API
const BASE_URL = 'http://localhost:8080'; // Base URL for the backend

const AuthService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Extract the token and role from the response structure
      const { response: responseData } = response.data;

      if (responseData.token) {
        localStorage.setItem('token', responseData.token);
        
        // Set token as default Authorization header for all future axios requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${responseData.token}`;
      }

      if (responseData.user && responseData.user.role) {
        // Store the role exactly as provided by the backend (without "ROLE_" prefix)
        localStorage.setItem('role', responseData.user.role.toUpperCase());
      }

      // Store the profile image URL directly from the response
      if (responseData.user && responseData.user.profileImageUrl) {
        // Get the profile image URL directly from the response
        let imageUrl = responseData.user.profileImageUrl;
        
        // If it's a relative path, prepend the base URL
        if (imageUrl && !imageUrl.startsWith('http')) {
          imageUrl = `${BASE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }
        
        // Store in localStorage
        localStorage.setItem('profileImageUrl', imageUrl);
      }

      // Store user object
      localStorage.setItem('user', JSON.stringify(responseData.user));

      return responseData; // Returning the structured response data
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error.response?.data || { message: 'Login failed' };
    }
  },
  logout: () => {
    // Clear all authentication data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('profileImageUrl');
    
    // Remove Authorization header
    delete axios.defaults.headers.common['Authorization'];
  },
  getCurrentUser: () => {
    // Retrieve user data from localStorage
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getRole: () => {
    return localStorage.getItem('role');
  },
  
  getProfileImageUrl: () => {
    return localStorage.getItem('profileImageUrl');
  },

  // Helper method to check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // Set up authorization header with stored token
  setupAxiosInterceptors: () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};

// Initialize axios with token if it exists (useful when app reloads)
AuthService.setupAxiosInterceptors();

export default AuthService;