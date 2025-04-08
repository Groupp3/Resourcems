import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import "./StudentUserLayout.css";

const StudentUserLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    const path = location.pathname.split("/").pop();
    const formatted = path.charAt(0).toUpperCase() + path.slice(1);
    setPageTitle(formatted || "Student");
  }, [location.pathname]);

  return (
    <div className="user-layout">
      <Header
        backgroundColor="#FFFFFF"
        textColor="#000000"
        borderColor="#DDDDDD"
        profileSrc="https://via.placeholder.com/100"
        profileName="Student"
        onLogout={handleLogout}
      />

      <Sidebar userRole="STUDENT" defaultOpen={true} logoText="EduVault" />

      <div className="user-main-content">
        
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default StudentUserLayout;
