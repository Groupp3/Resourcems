import React from "react";
import AdminPanel from "./AdminPanel";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Admin/AdminPanel",
  component: AdminPanel,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => (
  <Router>
    <AdminPanel {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {};
