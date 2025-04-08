import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';
const BASE_URL = 'http://localhost:8080';

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

      const { response: responseData } = response.data;

      if (responseData.token) {
        localStorage.setItem('token', responseData.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${responseData.token}`;
      }

      if (responseData.user?.role) {
        localStorage.setItem('role', responseData.user.role.toUpperCase());
      }

      if (responseData.user?.profileImageUrl) {
        let imageUrl = responseData.user.profileImageUrl;
        if (!imageUrl.startsWith('http')) {
          imageUrl = `${BASE_URL}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
        }
        localStorage.setItem('profileImageUrl', imageUrl);
      }

      localStorage.setItem('user', JSON.stringify(responseData.user));
      return responseData;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  logout: async (navigate) => {
    try {
      await axios.post(`${API_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.error("Server logout failed:", error.response?.data || error.message);
      // still continue to clear local storage
    }
  
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('profileImageUrl');
    delete axios.defaults.headers.common['Authorization'];
  
    if (navigate) {
      navigate('/auth');
    }
  },
  

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => localStorage.getItem('token'),
  getRole: () => localStorage.getItem('role'),
  getProfileImageUrl: () => localStorage.getItem('profileImageUrl'),
  isAuthenticated: () => !!localStorage.getItem('token'),

  setupAxiosInterceptors: () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};

AuthService.setupAxiosInterceptors();

export default AuthService;
