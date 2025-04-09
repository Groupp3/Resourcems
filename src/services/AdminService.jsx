import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/admin"; 
const USER_API_URL = "http://localhost:8080/api/users";

const handleApiError = (error) => {
  if (error.response) {
    console.error(`Error ${error.response.status}: ${error.response.statusText}`);
    console.error("Error details:", error.response.data);
  } else {
    console.error("Request error:", error.message);
  }
};

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

    const response = await axios.get(`${API_BASE_URL}/users`, config);
    return Array.isArray(response.data.response) ? response.data.response : [];
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

    const response = await axios.get(`${API_BASE_URL}/request`, config);
    return Array.isArray(response.data.response) ? response.data.response : [];
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

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
    handleApiError(error);
    throw error;
  }
};

export const updateUserRole = async (userId, roleName) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");
    
    if (!roleName || roleName.trim() === "") {
      throw new Error("Role name must be provided and cannot be empty");
    }
    
    // Try different formats for the role name
    const normalizedRoleName = roleName.trim().toUpperCase();
    
    console.log(`Sending request to update user ${userId} to role: ${normalizedRoleName}`);
    
    // Try with a different request body format
    const response = await axios.put(
      `${API_BASE_URL}/users/${userId}/role`,
      { 
        "roleName": normalizedRoleName  // Changed key from "role" to "roleName"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    console.log("Role update response:", response.data);
    
    if (response.data && response.data.message === "Role name must be provided" && !response.data.response) {
      throw new Error(response.data.message);
    }
    
    return response.data.response;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const softDeleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.delete(
      `${API_BASE_URL}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data.response;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User might not be authenticated.");
      return null;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.get(`${USER_API_URL}/profile`, config);
    return response.data.response || null;
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

export const uploadProfilePicture = async (file) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    console.log("Uploading file:", file.name, "Size:", file.size, "Type:", file.type);
    
    const response = await axios.post(
      `${USER_API_URL}/users/profile-picture`, 
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
         
        },
      }
    );
    
    console.log("Upload response:", response.data);
    
    if (response.data && response.data.response && response.data.response.profileImageUrl) {
      return response.data.response.profileImageUrl;
    } else {
      console.warn("Profile picture uploaded but no URL returned in the response");
      return null;
    }
  } catch (error) {
    console.error("Profile picture upload failed:", error);
    
    if (error.response) {
      console.error("Server response:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Error setting up request:", error.message);
    }
    
    throw error;
  }
};

export const bulkDeleteUsers = async (userIds) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.delete(
      `${API_BASE_URL}/users/batchDelete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: userIds  // This is how you send data in a DELETE request with axios
      }
    );
    return response.data.response;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};