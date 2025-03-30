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
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A responsive sidebar navigation component with customizable themes and toggle functionality.'
      },
    },
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    textColor: { control: 'color' },
    borderColor: { control: 'color' },
    hoverColor: { control: 'color' },
    activeColor: { control: 'color' },
    linkHoverColor: { control: 'color' },
    defaultOpen: { control: 'boolean' },
    logoText: { control: 'text' },
    onToggle: { action: 'toggled' }
  }
};

// Base menu items used in all stories
const baseMenuItems = [
  { icon: <i className="bi bi-house-door"></i>, text: 'Home', path: '/', active: true },
  { icon: <i className="bi bi-person"></i>, text: 'Profile', path: '/profile' },
  { icon: <i className="bi bi-people"></i>, text: 'Users', path: '/users' },
  { icon: <i className="bi bi-box-seam"></i>, text: 'Resource', path: '/resource' },
  { icon: <i className="bi bi-clipboard-check"></i>, text: 'Request', path: '/request' },
];

// Template function for creating stories
const Template = (args) => <Sidebar {...args} />;

// Default/Expanded state
export const Default = Template.bind({});
Default.args = {
  defaultOpen: true,
  logoText: 'EduV',
  toggleIcons: {
    open: <i className="bi bi-chevron-left"></i>,
    closed: <i className="bi bi-chevron-right"></i>
  },
  menuItems: baseMenuItems,
};

// Collapsed state
export const Collapsed = Template.bind({});
Collapsed.args = {
  ...Default.args,
  defaultOpen: false,
};

// Dark theme (your preferred theme)
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  ...Default.args,
  backgroundColor: '#132D46',
  textColor: '#ffffff',
  borderColor: 'rgba(255, 255, 255, 0.2)',
  hoverColor: '#ADBFD1',
  activeColor: '#01C38D',
};

// Light theme
export const LightTheme = Template.bind({});
LightTheme.args = {
  ...Default.args,
  backgroundColor: '#ffffff',
  textColor: '#333333',
  borderColor: '#e2e8f0',
  hoverColor: '#f7fafc',
  activeColor: '#3182ce',
};

// Interactive Demo with State
export const InteractiveDemo = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Create menu items with click handlers
  const interactiveMenuItems = baseMenuItems.map((item, index) => ({
    ...item,
    active: index === activeIndex,
    onClick: () => setActiveIndex(index)
  }));
  
  return (
    <div className="story-container">
      <Sidebar 
        defaultOpen={isOpen}
        logoText="EduV"
        menuItems={interactiveMenuItems}
        onToggle={(state) => setIsOpen(state)}
        toggleIcons={{
          open: <i className="bi bi-chevron-left"></i>,
          closed: <i className="bi bi-chevron-right"></i>
        }}
      />
      <div style={{ marginLeft: '20px' }}>
        <h3>Current State:</h3>
        <p>Sidebar is: {isOpen ? 'Open' : 'Closed'}</p>
        <p>Active menu item: {baseMenuItems[activeIndex].text}</p>
      </div>
    </div>
  );
};