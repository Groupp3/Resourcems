import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import UserLayout from "./UserLayout";

export default {
  title: "User/UserLayout",
  component: UserLayout,
};

const Template = (args) => (
  <Router>
    <UserLayout {...args}>
      <div style={{ padding: "20px", color: "#333" }}>Admin Content Here</div>
    </UserLayout>
  </Router>
);

export const DefaultLayout = Template.bind({});
DefaultLayout.args = {};
