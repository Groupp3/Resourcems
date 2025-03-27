import React from "react";
import { useNavigate } from "react-router-dom"; 
import Sidebar from "../../components/sidebar/Sidebar";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import "./AdminLayout.css"; 

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/"); 
  };

  return (
    <div className="admin-layout">
      <Sidebar userRole="ADMIN" defaultOpen={true} logoText="EduVault" />

      <div className="main-content">
        <div className="profile-container">
          <ProfileIcon 
            src="https://via.placeholder.com/100" 
            name="Admin" 
            size="sm"
            onLogout={handleLogout} // Ensure this is passed
          />
        </div>

        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
