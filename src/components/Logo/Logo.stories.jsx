import React from 'react';
import Logo from './Logo';

export default {
  title: 'Components/Logo',
  component: Logo,
  argTypes: {
    size: {
      control: { type: 'number', min: 20, max: 100 }
    },
    onClick: { action: 'clicked' }
  }
};

const Template = (args) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 40,
  text: 'EduV'
};

export const Large = Template.bind({});
Large.args = {
  size: 60,
  text: 'EduV'
};

export const NoText = Template.bind({});
NoText.args = {
  size: 40,
  text: ''
};

export const CustomClick = Template.bind({});
CustomClick.args = {
  size: 50,
  text: 'EduV',
  onClick: () => alert('Logo clicked!')
};