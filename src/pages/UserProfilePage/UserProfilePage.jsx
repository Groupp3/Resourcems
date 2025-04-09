import React from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import ProfileLayout from "../../layouts/profilelayout/ProfileLayout";
import styles from "./UserProfilePage.module.css";

const UserProfilePage = () => {
  return (
    <AdminLayout>
      <div className={styles.adminLayout}>
        <ProfileLayout />
      </div>
    </AdminLayout>
  );
};

export default UserProfilePage;
