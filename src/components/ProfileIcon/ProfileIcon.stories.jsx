import React from 'react';
import ProfileIcon from './ProfileIcon';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/ProfileIcon',
  component: ProfileIcon,
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

const Template = (args) => <ProfileIcon {...args} />;

export const Small = Template.bind({});
Small.args = {
  src: 'https://via.placeholder.com/40',
  name: 'John Doe',
  size: 'sm',
  onLogout: action('Logged out'),
};

export const Medium = Template.bind({});
Medium.args = {
  src: 'https://via.placeholder.com/60',
  name: 'Jane Smith',
  size: 'md',
  onLogout: action('Logged out'),
};

export const Large = Template.bind({});
Large.args = {
  src: 'https://via.placeholder.com/100',
  name: 'Alice Brown',
  size: 'lg',
  onLogout: action('Logged out'),
};

export const WithoutName = Template.bind({});
WithoutName.args = {
  src: 'https://via.placeholder.com/60',
  size: 'md',
  onLogout: action('Logged out'),
};
