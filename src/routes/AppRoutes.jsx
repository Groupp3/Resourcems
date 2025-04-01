import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import UsersPage from "../pages/UsersPage/UsersPage";
import ResourcePage from "../pages/ResourcePage/ResourcePage";
import RequestPage from "../pages/RequestPage/RequestPage";

const ProfilePlaceholder = () => <div>Profile Page - Coming Soon</div>;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Page */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Admin Pages (Each page already wraps itself in AdminLayout) */}
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/profile" element={<ProfilePlaceholder />} />
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="/admin/resource" element={<ResourcePage />} />
      <Route path="/admin/request" element={<RequestPage />} />

      {/* Default Redirects */}
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AppRoutes;
