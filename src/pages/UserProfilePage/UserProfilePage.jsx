import React from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import ProfileLayout from "../../layouts/profilelayout/ProfileLayout";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  return (
    <AdminLayout>
      <div className="user-profile-page">
      
        <ProfileLayout />
      </div>
    </AdminLayout>
  );
};

export default UserProfilePage;