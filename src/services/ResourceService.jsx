import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/resources";

// GET all resources with optional filters
export const getResources = async (contentType = "", tags = []) => {
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

    let url = `${API_BASE_URL}/admin/all`;
    const queryParams = [];

    if (contentType) {
      queryParams.push(`contentType=${contentType}`);
    }

    if (tags.length > 0) {
      tags.forEach((tag) =>
        queryParams.push(`tags=${encodeURIComponent(tag)}`)
      );
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join("&")}`;
    }

    const response = await axios.get(url, config);
    const resources = response.data.response || [];

    return resources.map(resource => ({
      ...resource,
      tags: resource.tagNames || []
    }));
  } catch (error) {
    console.error("Error fetching resources:", error);
    return [];
  }
};


// UPLOAD a new resource
export const uploadResource = async (file, isPublic = false, tags = []) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("isPublic", isPublic ? "true" : "false");
  tags.forEach((tag) => formData.append("tags", tag));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  const response = await axios.post(`${API_BASE_URL}/upload`, formData, config);
  return response.data.response;
};

// GET all tags
export const getAllTags = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("http://localhost:8080/api/resources/tags", config);
  return response.data.response || [];
};
export const getAccessibleResources = async (contentType = "") => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication token missing");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

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