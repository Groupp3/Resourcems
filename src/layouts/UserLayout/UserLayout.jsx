import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import SearchBar from "../../components/SearchBar/SearchBar"; // Added SearchBar import
import "./UserLayout.css";

const UserLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="user-layout">
      <Header 
         backgroundColor="#FFFFFF" 
         textColor="#000000" 
         borderColor="#DDDDDD"
         profileSrc="https://via.placeholder.com/100"
         profileName="Admin"
         onLogout={handleLogout}
      />

      <div className="searchbar-container"> 
        <SearchBar suggestions={["Dashboard", "Users", "Settings", "Reports"]} />
      </div>

      <Sidebar userRole="ADMIN" defaultOpen={true} logoText="EduVault" />

      <div className="main-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
