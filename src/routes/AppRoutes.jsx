// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import adminRoutes from "./AdminRoutes";
import studentRoutes from "./StudentRoute";
import { useAuth } from "../states/AuthContext"; // Make sure this is the correct path

const AppRoutes = () => {
  const { user } = useAuth();

  // Simple role-based check
  const getDefaultRoute = () => {
    if (user?.role === "ADMIN") return "/admin";
    if (user?.role === "STUDENT") return "/student";
    return "/auth";
  };

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      {/* Admin Routes */}
      {adminRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Student Routes */}
      {studentRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      {/* Default redirect based on role */}
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  );
};

export default AppRoutes;
