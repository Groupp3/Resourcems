import React from 'react';
import AuthPage from './AuthPage';

export default {
  title: 'Pages/AuthPage',
  component: AuthPage,
};

const Template = (args) => <AuthPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
