import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/admin"; // Base API URL
const USER_API_URL = "http://localhost:8080/api/users"; // For user profile
const API_USER_URL = "http://localhost:8080/api";

// Create an axios instance with auth interceptor
const authAxios = axios.create({
  baseURL: API_USER_URL
});

// Request interceptor to add the token from localStorage
authAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Function to fetch all users
export const getUsersByRole = async () => {
  try {
    const response = await authAxios.get(`/users`);
    console.log("Users retrieved:", response.data);
    return response.data.response || []; 
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

export const getPendingUsers = async () => {
  try {
    const response = await authAxios.get(`/admin/request`);
    console.log("Pending users retrieved:", response.data);
    return response.data.response || []; 
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Update user status
export const updateUserStatus = async (userId, status) => {
  try {
    const response = await authAxios.put(
      `/admin/users/${userId}/status?status=${status}`, 
      {}
    );
    return response.data.response;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

// Update user role
export const updateUserRole = async (userId, role) => {
  try {
    const response = await authAxios.put(
      `/admin/users/${userId}/role?role=${role}`,
      {}
    );
    return response.data.response;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

// Fetch current user profile
export const getUserProfile = async () => {
  try {
    console.log("Fetching user profile...");
    const response = await authAxios.get(`/users/profile`);
    console.log("User profile retrieved:", response.data);
    return response.data.response || null;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

export const updateUserProfile = async (updateDTO) => {
  try {
    const response = await authAxios.put(
      `/users/profile`,
      updateDTO
    );
    console.log("User profile updated:", response.data);
    return response.data.response || null;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Change user password - using the correct endpoint from ProfileService
export const changeUserPassword = async (passwordData) => {
  try {
    // Using the same endpoint as profile update, matching the ProfileService pattern
    const response = await authAxios.put(
      `/users/profile`,
      passwordData
    );
    console.log("Password changed successfully:", response.data);
    return response.data.response || null;
  } catch (error) {
    handleApiError(error);
    throw error; // Re-throw to allow handling in the component
  }
};

// Handle API errors
const handleApiError = (error) => {
  if (error.response) {
    console.error(`Error ${error.response.status}: ${error.response.statusText}`);
    console.error("Error details:", error.response.data);
  } else {
    console.error("Request error:", error.message);
  }
};