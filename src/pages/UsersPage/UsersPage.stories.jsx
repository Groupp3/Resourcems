import React from "react";
import UsersPage from "./UsersPage";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Admin/UsersPage",
  component: UsersPage,
};

const Template = (args) => (
  <MemoryRouter>
    <UsersPage {...args} />
  </MemoryRouter>
);

export const DefaultUsersPage = Template.bind({});
DefaultUsersPage.args = {};
