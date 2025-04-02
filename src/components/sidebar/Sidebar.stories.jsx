import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  decorators: [(Story) => (
    <BrowserRouter>
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    </BrowserRouter>
  )],
  argTypes: {
    userRole: {
      control: { type: 'select', options: ['ADMIN', 'MENTOR', 'STUDENT'] },
    },
    defaultOpen: {
      control: { type: 'boolean' },
    },
    theme: {
      control: { type: 'select', options: ['light', 'dark'] },
    },
  },
};

const Template = ({ theme, ...args }) => {
  const [isOpen, setIsOpen] = useState(args.defaultOpen);

  const handleToggle = (newState) => {
    setIsOpen(newState);
  };

  return (
    <Sidebar
      {...args}
      defaultOpen={isOpen}
      onToggle={handleToggle}
      backgroundColor={theme === 'light' ? '#f8f9fa' : '#132D46'}
      textColor={theme === 'light' ? '#212529' : '#ffffff'}
      borderColor={theme === 'light' ? '#dee2e6' : '#2d3748'}
      hoverColor={theme === 'light' ? '#e9ecef' : '#ADBFD1'}
      activeColor={theme === 'light' ? '#0d6efd' : '#01C38D'}
      linkHoverColor={theme === 'light' ? '#0d6efd' : '#3182ce'}
    />
  );
};

export const AdminSidebar = Template.bind({});
AdminSidebar.args = {
  userRole: 'ADMIN',
  defaultOpen: true,
  theme: 'dark',
};

export const MentorSidebar = Template.bind({});
MentorSidebar.args = {
  userRole: 'MENTOR',
  defaultOpen: true,
  theme: 'dark',
};

export const StudentSidebar = Template.bind({});
StudentSidebar.args = {
  userRole: 'STUDENT',
  defaultOpen: true,
  theme: 'dark',
};

export const CollapsedSidebar = Template.bind({});
CollapsedSidebar.args = {
  userRole: 'STUDENT',
  defaultOpen: false,
  theme: 'dark',
};

export const LightThemeSidebar = Template.bind({});
LightThemeSidebar.args = {
  userRole: 'ADMIN',
  defaultOpen: true,
  theme: 'light',
};