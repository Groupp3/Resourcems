// src/utils/authUtils.js
import jwt_decode from "jwt-decode";

export const getUserRoleFromToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    return decoded.role || null; // Adjust key if your token uses a different key
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
