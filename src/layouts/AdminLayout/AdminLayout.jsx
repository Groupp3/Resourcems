import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import adminRoutes from "../../routes/AdminRoutes"; 
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    // Prioritize more specific routes
    const matched = [...adminRoutes]
      .sort((a, b) => b.path.length - a.path.length)
      .find(route => location.pathname.startsWith(route.path));
    
    setPageTitle(matched ? matched.title : "Admin");
  }, [location.pathname]);

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
        <div className="title">{pageTitle}</div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
