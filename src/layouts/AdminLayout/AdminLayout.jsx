import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      <Header 
         backgroundColor="#FFFFFF" 
         textColor="#000000" 
         borderColor="#DDDDDD"
         profileSrc="https://via.placeholder.com/100"
         profileName="Admin"
         onLogout={handleLogout}
         onMenuClick={toggleSidebar}
      />
      
      <Sidebar 
        userRole="ADMIN" 
        defaultOpen={sidebarOpen} 
        logoText="EduVault" 
        isOpen={sidebarOpen}
        onClose={() => window.innerWidth < 768 && setSidebarOpen(false)}
      />

      <div className="admin-main-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;