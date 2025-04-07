import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import "./StudentLayout.css";

const StudentLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="student-layout">
      {/* Header with student-specific appearance */}
      <Header
        backgroundColor="#F5F7FA"
        textColor="#1A202C"
        borderColor="#E2E8F0"
        profileSrc="https://via.placeholder.com/100"
        profileName="Student"
        onLogout={handleLogout}
      />

      {/* Sidebar with user role STUDENT */}
      <Sidebar userRole="STUDENT" defaultOpen={true} logoText="EduVault" />

      {/* Main Content Area */}
      <div className="student-main-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default StudentLayout;
