// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Icons, Icon } from './utils/iconUtils';

// Import pages (these would be created in the pages directory)
const Dashboard = () => <h1>Dashboard Page</h1>;
const Analytics = () => <h1>Analytics Page</h1>;
const Settings = () => <h1>Settings Page</h1>;
const Profile = () => <h1>Profile Page</h1>;
const Help = () => <h1>Help Page</h1>;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Define sidebar props based on theme
  const sidebarProps = isDarkMode ? {
    backgroundColor: '#1a202c',
    textColor: '#f7fafc',
    borderColor: '#2d3748',
    hoverColor: '#2d3748',
    activeColor: '#4299e1',
    logoText: 'Dark App',
    toggleIcons: {
      open: <Icon name="chevronLeft" color="#fff" />,
      closed: <Icon name="chevronRight" color="#fff" />
    },
    menuItems: [
          { icon: <Icon name="home" />, text: 'Home', path: '/' },
          { icon: <Icon name="profile" />, text: 'Profile', path: '/profile' },
          { icon: <Icon name="users" />, text: 'Users', path: '/users' },
          { icon: <Icon name="profile" />, text: 'Profile', path: '/profile' },
          { icon: <Icon name="resource" />, text: 'Resource', path: '/resource' },
          
    ]
  } : {
    backgroundColor: '#ffffff',
    textColor: '#333333',
    borderColor: '#e2e8f0',
    hoverColor: '#f7fafc',
    activeColor: '#ebf8ff',
    linkHoverColor: '#3182ce',
    logoText: 'Light App',
    toggleIcons: {
      open: <Icon name="chevronLeft" color="#333" />,
      closed: <Icon name="chevronRight" color="#333" />
    },
    menuItems: [
          { icon: <Icon name="home" />, text: 'Home', path: '/' },
          { icon: <Icon name="profile" />, text: 'Profile', path: '/profile' },
          { icon: <Icon name="users" />, text: 'Users', path: '/users' },
          { icon: <Icon name="profile" />, text: 'Profile', path: '/profile' },
          { icon: <Icon name="resource" />, text: 'Resource', path: '/resource' }
    ]
  };
  
 
  const layoutBgColor = isDarkMode ? '#2d3748' : '#f8f9fa';

  return (
    <Router>
      <MainLayout 
        backgroundColor={layoutBgColor}
        contentPadding="30px 20px"
        defaultSidebarOpen={true}
        sidebarProps={sidebarProps}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;