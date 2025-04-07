// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import adminRoutes from "./AdminRoutes";
import { useAuth } from "../states/AuthContext"; // Adjust path as needed

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      {adminRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AppRoutes;
