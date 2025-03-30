import React from "react";
import UserCard from "./UserCard";

export default {
  title: "Components/UserCard",
  component: UserCard,
};

const Template = (args) => <UserCard {...args} />;

export const AdminUser = Template.bind({});
AdminUser.args = {
  name: "Michael Lawson",
  email: "michael.lawson@gmail.com",
  avatar: "https://reqres.in/img/faces/7-image.jpg",
  accentColor: "#ddd6fe",
  role: "Admin",
};

export const StudentUser = Template.bind({});
StudentUser.args = {
  name: "Lindsay Ferguson",
  email: "lindsay.ferguson@gmail.com",
  avatar: "https://reqres.in/img/faces/8-image.jpg",
  accentColor: "#ddd6fe",
  role: "Student",
};

export const MentorUser = Template.bind({});
MentorUser.args = {
  name: "Alex Johnson",
  email: "alex.johnson@gmail.com",
  avatar: "https://reqres.in/img/faces/9-image.jpg",
  accentColor: "#ddd6fe",
  role: "Mentor",
};
