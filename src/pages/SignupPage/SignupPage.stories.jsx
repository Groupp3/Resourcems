import React from "react";
import SignupPage from "./SignupPage";

export default {
  title: "Pages/SignupPage",
  component: SignupPage,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: () => <SignupPage />,
};
