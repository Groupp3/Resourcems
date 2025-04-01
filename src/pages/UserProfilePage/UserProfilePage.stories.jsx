import React from "react";
import UserProfilePage from "./UserProfilePage";

export default {
  title: "Pages/UserProfilePage",
  component: UserProfilePage,
};

const Template = (args) => <UserProfilePage {...args} />;

export const Default = Template.bind({});
Default.args = {};
