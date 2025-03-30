import React from "react";
import AdminLayout from "./AdminLayout";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Admin/AdminLayout",
  component: AdminLayout,
};

const Template = (args) => (
  <Router>
    <AdminLayout {...args}>
      <div style={{ padding: "20px", color: "#333" }}>Admin Content Here</div>
    </AdminLayout>
  </Router>
);

export const DefaultLayout = Template.bind({});
DefaultLayout.args = {};
