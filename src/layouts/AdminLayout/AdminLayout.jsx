import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header"; 
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
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
      />
      
      
      <Sidebar userRole="ADMIN" defaultOpen={true} logoText="EduVault" />

     
      <div className="admin-main-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
