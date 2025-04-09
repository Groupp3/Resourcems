// src/routes/ProtectedRoute.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../states/AuthContext";
import NotFoundPage from "../pages/NotFoundPage";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <NotFoundPage />;
  }

  const path = location.pathname;

  const rolePathMap = {
    ADMIN: "/admin",
    STUDENT: "/student",
    MENTOR: "/mentor",
  };

  const allowedPrefix = rolePathMap[user.role];

  if (!path.startsWith(allowedPrefix)) {
    return <NotFoundPage />;
  }

  return children;
};

export default ProtectedRoute;
