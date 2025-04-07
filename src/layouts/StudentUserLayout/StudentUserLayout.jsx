import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./StudentUserLayout.css"; // Reuse same styling

const StudentUserLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="user-layout">
      <div>
        <Header 
          backgroundColor="#FFFFFF" 
          textColor="#000000" 
          borderColor="#DDDDDD"
          profileSrc="https://via.placeholder.com/100"
          profileName="Student"
          onLogout={handleLogout}
        />

        <div className="searchbar-container"> 
          <SearchBar suggestions={["Mentors", "Dashboard", "Resources"]} />
        </div>
      

      <Sidebar userRole="STUDENT" defaultOpen={true} logoText="EduVault" />

      <div className="main-content">
        <div className="content">{children}</div>
      </div>
    </div>
    </div>
  );
};

export default StudentUserLayout;
