// src/services/AuthService.js
import axios from 'axios';
 
const API_URL = 'http://localhost:8080/api/auth'; // Base URL for authentication API
 
const AuthService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
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
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Store JWT token and role in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      if (response.data.role) {
        localStorage.setItem('role', response.data.role);
      }
      // Optional: Store the entire user object if needed
      localStorage.setItem('user', JSON.stringify(response.data.user || response.data));
      return response.data; // Returning the response data for use in components
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
  // Helper method to check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
 
export default AuthService;