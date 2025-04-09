// // src/services/ProfileService.jsx
// import axios from 'axios';

// // Use a direct URL instead of environment variables to avoid the process reference error
// const API_BASE_URL = 'http://localhost:8080/api';

// // Add auth token to all requests
// const authAxios = axios.create({
//   baseURL: API_BASE_URL
// });

// // Request interceptor to add the token from localStorage
// authAxios.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// export const profileService = {
//   // Get current user profile
//   getCurrentUser: async () => {
//     try {
//       const response = await authAxios.get('/users/profile');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       throw error;
//     }
//   },
  
//   // Update user profile
//   updateProfile: async (userData) => {
//     try {
//       const response = await authAxios.put('/users/profile', userData);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       throw error;
//     }
//   },
  
//   // Change password
//   changePassword: async (passwordData) => {
//     try {
//       const response = await authAxios.put('/users/profile', passwordData);
//       return response.data;
//     } catch (error) {
//       console.error('Error changing password:', error);
//       throw error;
//     }
//   }
// };

// export default profileService;