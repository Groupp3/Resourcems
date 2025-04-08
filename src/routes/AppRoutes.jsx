import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import UsersPage from "../pages/UsersPage/UsersPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import DocumentPage from "../pages/DocumentPage/DocumentPage";
import RequestPage from "../pages/RequestPage/RequestPage";
import VideoCardPage from "../pages/VideoCardPage/VideoCardPage";
import CertificatePage from "../pages/CertificatePage/CertificatePage";
import ResourcePage from "../pages/ResourcePage/ResourcePage";




const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Page */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Admin Pages (Each page already wraps itself in AdminLayout) */}
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/admin/users" element={<UsersPage />} />
      <Route path="/admin/profile" element={<UserProfilePage />} />
      <Route path="/admin/document" element={<DocumentPage />} />
      <Route path="/admin/request" element={<RequestPage />} />
      <Route path="/admin/resource" element={<ResourcePage />} />


    
      <Route path="resource/videos" element={<VideoCardPage />} />
      <Route path="/resource/certificates" element={<CertificatePage />} />  
      <Route path="/resource/documents" element={<DocumentPage />} />





      {/* Default Redirects */}
      <Route path="/" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AppRoutes;
