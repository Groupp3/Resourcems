import React from "react";
import RequestPage from "./RequestPage";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Pages/RequestPage",
  component: RequestPage,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = () => (
  <Router>
    <RequestPage />
  </Router>
);

export const Default = Template.bind({});
