import React from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import AdminPanelBodyLayout from "../../layouts/adminpanelbodylayout/AdminPanelBodyLayout";
import "./AdminPanel.css";

const AdminPanel = () => {
  return (
    <AdminLayout>
      <div className="admin-panel-container">
        <AdminPanelBodyLayout />
      </div>
    </AdminLayout>
  );
};

export default AdminPanel;
