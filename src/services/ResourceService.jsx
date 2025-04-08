import axios from "axios";
 
const API_BASE_URL = "http://localhost:8080/api/resources";
 
export const getResources = async (contentType = "") => {
  try {
    const token = localStorage.getItem("token");
 
    if (!token) {
      throw new Error("Authentication token missing");
    }
 
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
 
    const url = contentType
      ? `${API_BASE_URL}/list?contentType=${contentType}`
      : `${API_BASE_URL}/list`;
 
    const response = await axios.get(url, config);
 
    return response.data.response || [];
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
};
 
