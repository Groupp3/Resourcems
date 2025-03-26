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
     
    </AdminLayout>
  </Router>
);

export const DefaultLayout = Template.bind({});
DefaultLayout.args = {};
