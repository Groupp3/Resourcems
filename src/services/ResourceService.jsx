import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/resources";

const handleApiError = (error) => {
  if (error.response) {
    console.error(`Error ${error.response.status}: ${error.response.statusText}`);
    console.error("Error details:", error.response.data);
  } else {
    console.error("Request error:", error.message);
  }
};


export const getResources = async () => {
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

    const response = await axios.get(`${API_BASE_URL}/list`, config);
    return Array.isArray(response.data.response) ? response.data.response : [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};


