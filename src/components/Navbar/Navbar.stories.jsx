// src/stories/Navbar.stories.jsx
import React from 'react';
import Navbar from './Navbar';
import { FaHome, FaCog, FaUserAlt } from 'react-icons/fa';  // Import React Icons

export default {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    brandImage: { control: 'text', description: 'Brand image URL' },
    brandTitle: { control: 'text', description: 'Brand title text' },
    menuItems: { 
      control: 'object', 
      description: 'Array of menu items with title and icon' 
    },
    onLogout: { action: 'logged out', description: 'Logout action' },
  },
};

const Template = (args) => <Navbar {...args} />;

export const DefaultNavbar = Template.bind({});
DefaultNavbar.args = {
  brandImage: 'https://via.placeholder.com/50',  // Sample brand image
  brandTitle: 'My Dashboard',
  menuItems: [
    { title: 'Home', icon: <FaHome /> },  // Using React Icons
    { title: 'Settings', icon: <FaCog /> },
    { title: 'Profile', icon: <FaUserAlt /> },
  ],
};

export const CustomNavbar = Template.bind({});
CustomNavbar.args = {
  brandImage: 'https://via.placeholder.com/50',
  brandTitle: 'Custom Dashboard',
  menuItems: [
    { title: 'Dashboard', icon: <FaHome /> },
    { title: 'Reports', icon: <FaCog /> },
    { title: 'Users', icon: <FaUserAlt /> },
    { title: 'Settings', icon: <FaCog /> },
  ],
};
