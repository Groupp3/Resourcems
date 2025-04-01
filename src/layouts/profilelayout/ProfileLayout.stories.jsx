import React from "react";
import ProfileLayout from "./ProfileLayout";

export default {
  title: "Components/ProfileLayout",
  component: ProfileLayout,
};

const Template = (args) => <ProfileLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  profileSrc: "https://via.placeholder.com/150",
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  onSave: (data) => alert(`Saved: ${JSON.stringify(data)}`),
};
