import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";
import "./AdminLayout.css"; // Create this CSS file for layout styling

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      {/* Sidebar on the left */}
      <Sidebar userRole="ADMIN" defaultOpen={true} logoText="Edu Vault" />

      <div className="main-content">
        {/* Profile Icon on the top right */}
        <div className="profile-container">
          <ProfileIcon src="https://via.placeholder.com/100" name="Admin" size="sm" />
        </div>

        {/* Main content area */}
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
