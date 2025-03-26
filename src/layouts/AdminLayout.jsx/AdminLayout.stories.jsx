import React from "react";
import AdminLayout from "./AdminLayout";
import { BrowserRouter as Router } from "react-router-dom";

// Dummy content for testing
const DummyContent = () => (
  <div style={{ padding: "20px", textAlign: "center" }}>
    <h2>Admin Dashboard</h2>
    <p>Welcome to the admin panel.</p>
  </div>
);

export default {
  title: "Admin/AdminLayout",
  component: AdminLayout,
};

const Template = (args) => (
  <Router>
    <AdminLayout {...args}>
      <DummyContent />
    </AdminLayout>
  </Router>
);

export const DefaultLayout = Template.bind({});
DefaultLayout.args = {};
