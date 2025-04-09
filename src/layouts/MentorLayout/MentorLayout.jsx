import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header"; 

import mentorRoutes from "../../routes/MentorRoute"; 
import "./MentorLayout.css";

const MentorLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  useEffect(() => {
    const matched = [...mentorRoutes]
      .sort((a, b) => b.path.length - a.path.length)
      .find(route => location.pathname.startsWith(route.path));
    
    setPageTitle(matched ? matched.title : "Mentor");
  }, [location.pathname]);

  return (
    <div className="mentor-layout">
      <Header
        backgroundColor="#FFFFFF"
        textColor="#000000"
        borderColor="#DDDDDD"
        profileSrc="https://via.placeholder.com/100"
        onLogout={handleLogout}
      />

      <Sidebar userRole="MENTOR" defaultOpen={true} logoText="EduVault" />

      <div className="mentor-main-content">
        
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default MentorLayout;
