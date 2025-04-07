import React from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import AdminPanelBodyLayout from "../../layouts/adminpanelbodylayout/AdminPanelBodyLayout";
import styles from "./AdminPanel.module.css";

const AdminPanel = () => {
  return (
    <AdminLayout>
      <div className={styles.adminlayout}>
        <AdminPanelBodyLayout />
      </div>
    </AdminLayout>
  );
};

export default AdminPanel;
