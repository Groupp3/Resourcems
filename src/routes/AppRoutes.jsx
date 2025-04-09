// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import adminRoutes from "./AdminRoutes";
import studentRoutes from "./StudentRoute";
import mentorRoutes from "./MentorRoute";
import { useAuth } from "../states/AuthContext";
import ProtectedRoute from "../routes/ProtectedRoute"; // import it

const AppRoutes = () => {
  const { user } = useAuth();

  const getDefaultRoute = () => {
    if (user?.role === "ADMIN") return "/admin";
    if (user?.role === "STUDENT") return "/student";
    if (user?.role === "MENTOR") return "/mentor";
    return "/auth";
  };

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      {/* Admin Routes */}
      {adminRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute>{element}</ProtectedRoute>}
        />
      ))}

      {/* Student Routes */}
      {studentRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute>{element}</ProtectedRoute>}
        />
      ))}

      {/* Mentor Routes */}
      {mentorRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute>{element}</ProtectedRoute>}
        />
      ))}

      {/* Default redirect based on role */}
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  );
};

export default AppRoutes;