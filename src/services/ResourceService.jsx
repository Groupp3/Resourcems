import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/resources";

// Setup headers with token
const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authentication token missing");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ GET all resources with optional filters (admin)
export const getResources = async (contentType = "", tags = []) => {
  try {
    const config = getAuthConfig();
    let url = `${API_BASE_URL}/admin/all`;
    const queryParams = [];

    if (contentType) {
      queryParams.push(`contentType=${encodeURIComponent(contentType)}`);
    }

    if (tags.length > 0) {
      tags.forEach((tag) => queryParams.push(`tags=${encodeURIComponent(tag)}`));
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    const response = await axios.get(url, config);
    const resources = response.data.response || [];

    return resources.map((resource) => ({
      ...resource,
      tags: resource.tagNames || [],
    }));
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
};

// ✅ GET accessible (public + private) resources for logged-in user
export const getAccessibleResources = async (contentType = "") => {
  try {
    const config = getAuthConfig();
    let url = `${API_BASE_URL}/list`;

    if (contentType) {
      url += `?contentType=${encodeURIComponent(contentType)}`;
    }

    const response = await axios.get(url, config);
    return response.data.response || [];
  } catch (error) {
    console.error("Error fetching accessible resources:", error);
    return [];
  }
};

/// ✅ UPLOAD multiple resources
export const uploadResource = async (files, isPublic = false, tags = []) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token missing. Please log in again.");
  
      const formData = new FormData();
      
      // Handle both single file or array of files
      const fileArray = Array.isArray(files) ? files : [files];
      
      // Append each file to formData
      for (const file of fileArray) {
        formData.append("files", file);
      }
      
      // Append visibility parameter as string "true" or "false"
      formData.append("visibility", isPublic.toString());
      
       if (tags && tags.length > 0) {
        formData.append("tags", JSON.stringify(tags));
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
          // Let axios set the correct Content-Type for multipart/form-data
        },
      };
  
      const response = await axios.post(`${API_BASE_URL}/upload-multiple`, formData, config);
      return response.data.response;
    } catch (error) {
      console.error("Error uploading resources:", error);
      throw error;
    }
  };
  

// ✅ DELETE a resource
export const deleteResource = async (resourceId) => {
  try {
    const config = getAuthConfig();
    await axios.delete(`${API_BASE_URL}/${resourceId}`, config);
    console.log(`Resource with ID ${resourceId} deleted.`);
  } catch (error) {
    console.error("Error deleting resource:", error);
    throw error;
  }
};

// ✅ GET all tags
export const getAllTags = async () => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(`${API_BASE_URL}/tags`, config);
    return response.data.response || [];
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};
// ✅ SHARE a resource with another user
export const shareResource = async (resourceId, userIds) => {
    try {
      const config = getAuthConfig();
      const url = `${API_BASE_URL}/${resourceId}/share`;
      
      // Handle both single userId (string/number) and array of userIds
      if (Array.isArray(userIds)) {
        // If it's an array of user IDs, make multiple requests
        const sharePromises = userIds.map(userId => 
          axios.post(
            url,
            null, // No body needed
            {
              ...config,
              params: {
                userId: userId,
              },
            }
          )
        );
        
        // Wait for all share operations to complete
        const results = await Promise.all(sharePromises);
        console.log(`Resource shared successfully with ${userIds.length} users`);
        return results.map(response => response.data.message);
      } else {
        // Original implementation for single user ID
        const response = await axios.post(
          url,
          null, // No body needed
          {
            ...config,
            params: {
              userId: userIds, // Single user ID
            },
          }
        );
        
        console.log("Resource shared successfully:", response.data.message);
        return response.data.message;
      }
    } catch (error) {
      console.error("Error sharing resource:", error);
      throw error;
    }
  };