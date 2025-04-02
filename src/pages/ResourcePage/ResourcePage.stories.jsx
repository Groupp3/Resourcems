import React from "react";
import ResourcePage from "./ResourcePage";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Pages/ResourcePage",
  component: ResourcePage,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = () => (
  <Router>
    <ResourcePage />
  </Router>
);

export const Default = Template.bind({});
