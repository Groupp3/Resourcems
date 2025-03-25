import React from 'react';
import SignupForm from "./SignupForm";

export default {
  title: "Components/SignupForm",
  component: SignupForm,
};

const Template = (args) => <SignupForm {...args} />;

export const Default = Template.bind({});
Default.args = {};