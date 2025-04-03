import React from 'react';
import UserProfileIcon from './UserProfileIcon';

export default {
  title: 'Components/UserProfileIcon',
  component: UserProfileIcon,
  argTypes: {
    size: { 
      control: { type: 'range', min: 30, max: 120, step: 5 },
      defaultValue: 60
    },
    onAddClick: { action: 'add clicked' },
    onLogout: { action: 'logout clicked' },
    onProfileClick: { action: 'profile clicked' }
  }
};

// Default template
const Template = (args) => <UserProfileIcon {...args} />;

// Default view
export const Default = Template.bind({});
Default.args = {
  user: {
    name: 'John Doe',
    profileImage: '/api/placeholder/200/200'
  },
  size: 60
};

// Small size
export const Small = Template.bind({});
Small.args = {
  user: {
    name: 'Jane Smith',
    profileImage: '/api/placeholder/200/200'
  },
  size: 40
};

// Large size
export const Large = Template.bind({});
Large.args = {
  user: {
    name: 'Mike Johnson',
    profileImage: '/api/placeholder/200/200'
  },
  size: 100
};

// With dark background
export const WithDarkBackground = (args) => (
  <div style={{ backgroundColor: '#333', padding: '20px' }}>
    <UserProfileIcon {...args} />
  </div>
);
WithDarkBackground.args = {
  user: {
    name: 'Alex Morgan',
    profileImage: '/api/placeholder/200/200'
  },
  size: 60
};