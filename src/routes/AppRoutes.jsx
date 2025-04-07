// src/routes/AppRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import UsersPage from "../pages/UsersPage/UsersPage";
import UserProfilePage from "../pages/UserProfilePage/UserProfilePage";
import ResourcePage from "../pages/ResourcePage/ResourcePage";
import RequestPage from "../pages/RequestPage/RequestPage";
import StudentPanel from "../pages/StudentPanel/StudentPanel";
import StudentsPage from "../pages/StudentPage/StudentPage"; // ✅ Import new page
import { useAuth } from "../states/AuthContext";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={user?.role === 'ADMIN' ? <AdminPanel /> : <Navigate to="/auth" />} />
      <Route path="/admin/users" element={user?.role === 'ADMIN' ? <UsersPage /> : <Navigate to="/auth" />} />
      <Route path="/admin/profile" element={user?.role === 'ADMIN' ? <UserProfilePage /> : <Navigate to="/auth" />} />
      <Route path="/admin/resource" element={user?.role === 'ADMIN' ? <ResourcePage /> : <Navigate to="/auth" />} />
      <Route path="/admin/request" element={user?.role === 'ADMIN' ? <RequestPage /> : <Navigate to="/auth" />} />

      {/* Student Routes */}
      <Route path="/student" element={user?.role === 'STUDENT' ? <StudentPanel /> : <Navigate to="/auth" />} />
      <Route path="/student/users" element={user?.role === 'STUDENT' ? <StudentsPage /> : <Navigate to="/auth" />} /> {/* ✅ New route */}

      {/* Default Routes */}
      <Route
        path="/"
        element={
          user?.role === 'ADMIN'
            ? <Navigate to="/admin" replace />
            : user?.role === 'STUDENT'
              ? <Navigate to="/student" replace />
              : <Navigate to="/auth" replace />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
