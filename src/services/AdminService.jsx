import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/admin"; // Base API URL

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

    return response.data.response || []; // Ensure it returns an array
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

// Function to fetch pending user requests
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

    const response = await axios.get(`${API_BASE_URL}/request`, config);

    console.log("Pending users retrieved:", response.data);

    return response.data.response || []; // Ensure it returns an array
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
