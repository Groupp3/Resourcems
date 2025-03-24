// src/utils/iconUtils.jsx
import React from 'react';

// Import the SVG files directly using ESM import syntax
import homeIcon from '../assets/home.svg';
import profileIcon from '../assets/profile.svg';
import usersIcon from '../assets/userlist.svg';
import resourceIcon from '../assets/resource.svg';
import requestIcon from '../assets/request.svg';
import chevronLeftIcon from '../assets/icons/chevron-left.svg';
import chevronRightIcon from '../assets/icons/chevron-right.svg';

// This function creates an importable object that maps icon names to their SVG files
// It helps maintain a centralized registry of all SVG icons used in the application
export const Icons = {
  // Navigation Icons
  home: homeIcon,
  profile: profileIcon,
  users: usersIcon,
  resource: resourceIcon,
  request: requestIcon,
  
  // Additional icons from your storybook
  chevronLeft: chevronLeftIcon,
  chevronRight: chevronRightIcon,
  
  // Add more icons as needed...
};

// This component makes it easy to use SVG icons with custom styling
// Usage: <Icon name="dashboard" size={24} color="#fff" />
export const Icon = ({ name, size = 24, color, className, onClick }) => {
  const IconSvg = Icons[name];
  
  if (!IconSvg) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return (
    <div 
      className={className} 
      style={{ 
        width: size, 
        height: size, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
      <img 
        src={IconSvg} 
        alt={name} 
        style={{ 
          width: '100%', 
          height: '100%', 
          filter: color ? `invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%)` : undefined
        }} 
      />
    </div>
  );
};

// Properly format the docgen info
Icon.__docgenInfo = {
  "description": "Icon component for displaying SVG icons with custom styling",
  "methods": [],
  "displayName": "Icon",
  "props": {
    "name": {
      "type": { "name": "string" },
      "required": true,
      "description": "Name of the icon (must be registered in the Icons object)"
    },
    "size": {
      "defaultValue": {
        "value": "24",
        "computed": false
      },
      "type": { "name": "number" },
      "required": false,
      "description": "Size of the icon in pixels (width and height)"
    },
    "color": {
      "type": { "name": "string" },
      "required": false,
      "description": "Color to apply to the icon (will be converted to filter)"
    },
    "className": {
      "type": { "name": "string" },
      "required": false,
      "description": "Additional CSS classes to apply to the icon container"
    },
    "onClick": {
      "type": { "name": "func" },
      "required": false,
      "description": "Click handler for the icon"
    }
  }
};