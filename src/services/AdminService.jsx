import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Base API URL

// Function to fetch all users
export const getUsersByRole = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. User might not be authenticated.");
      return [];
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    console.log("Fetching users...");

    const response = await axios.get(`${API_BASE_URL}/users`, config);

    console.log("Users retrieved:", response.data);

    return response.data.response || []; 
  } catch (error) {
    handleApiError(error);
    return [];
  }
};



export const getPendingUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. User might not be authenticated.");
      return [];
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    console.log("Fetching pending users...");

    const response = await axios.get(`${API_BASE_URL}/admin/request`, config);

    console.log("Pending users retrieved:", response.data);

    return response.data.response || []; 
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    console.error(`Error ${error.response.status}: ${error.response.statusText}`);
    console.error("Error details:", error.response.data);
  } else {
    console.error("Request error:", error.message);
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("No authentication token found");
    }
    
    const response = await axios.put(
      `${API_BASE_URL}/users/${userId}/status?status=${status}`, 
      {},  
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.response;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

export const updateUserRole = async (userId, roleName) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      throw new Error("No authentication token found");
    }
    
    
    const response = await axios.put(
      `${API_BASE_URL}/users/${userId}/role?role=${roleName}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.response;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};
