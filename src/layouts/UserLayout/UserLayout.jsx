import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import AuthService from "../../services/AuthService"; // Import AuthService


const UserLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    navigate("/"); // Redirect to landing/login page after logout
  };

  return (
    <div className="user-layout">
      <div>
        <Header 
          backgroundColor="#FFFFFF" 
          textColor="#000000" 
          borderColor="#DDDDDD"
          profileSrc={AuthService.getProfileImageUrl()}
          profileName={AuthService.getCurrentUser()?.name || "User"}
          onLogout={handleLogout}
        />

        <div className="searchbar-container"> 
          <SearchBar suggestions={["Dashboard", "Users", "Settings", "Reports"]} />
        </div>
      </div>

      <Sidebar userRole="ADMIN" defaultOpen={true} logoText="EduVault" />

      <div className="main-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;