import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Sidebar.css';
import Logo from "../../assets/logo.svg?url";

// Define menu items for different roles
const MENU_ITEMS = {
  ADMIN: [
    { icon: <i className="bi bi-house-door"></i>, text: 'Home', path: '/', active: true },
    { icon: <i className="bi bi-person"></i>, text: 'Profile', path: '/profile' },
    { icon: <i className="bi bi-people"></i>, text: 'Users', path: '/users' },
    { icon: <i className="bi bi-box-seam"></i>, text: 'Resource', path: '/resource' },
    { icon: <i className="bi bi-clipboard-check"></i>, text: 'Request', path: '/request' },
  ],
  MENTOR: [
    { icon: <i className="bi bi-house-door"></i>, text: 'Home', path: '/', active: true },
    { icon: <i className="bi bi-person"></i>, text: 'Profile', path: '/profile' },
    { icon: <i className="bi bi-people"></i>, text: 'Students',path:'/users'},
    { icon: <i className="bi bi-box-seam"></i>, text: 'Resource', path: '/resource' },
    
  ],
  STUDENT: [
    { icon: <i className="bi bi-house-door"></i>, text: 'Home', path: '/', active: true },
    { icon: <i className="bi bi-person"></i>, text: 'Profile', path: '/profile' },
    { icon: <i className="bi bi-people"></i>, text: 'Mentors',path:'/users' },
    { icon: <i className="bi bi-box-seam"></i>, text: 'Resource', path: '/resource' },
  
  ]
};

const Sidebar = ({
  userRole = 'STUDENT', // Default to student role
  defaultOpen,
  logoText,
  toggleIcons,
  backgroundColor,
  textColor,
  borderColor,
  hoverColor,
  activeColor,
  linkHoverColor,
  onToggle
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const location = useLocation();

  // Get menu items based on user role
  const menuItems = MENU_ITEMS[userRole] || [];

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  const cssVariables = {
    '--backgroundColor': backgroundColor,
    '--textColor': textColor,
    '--borderColor': borderColor,
    '--hoverColor': hoverColor,
    '--activeColor': activeColor,
    '--linkHoverColor': linkHoverColor,
  };

  return (
    <div 
      className={`sidebar ${isOpen ? 'open' : 'closed'}`} 
      style={cssVariables}
    >
      <div className="sidebar-header" onClick={handleToggle}> 
        <img src={Logo} alt="Brand Logo" className="brand-logo" />
        {isOpen && <span className="logo">{logoText}</span>}
        {toggleIcons && (
          <span className="toggle-icon">
            {isOpen ? toggleIcons.open : toggleIcons.closed}
          </span>
        )}
      </div>
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <Link 
              to={item.path} 
              className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="icon">{item.icon}</span>
              {isOpen && <span className="text">{item.text}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  userRole: PropTypes.oneOf(['ADMIN', 'MENTOR', 'STUDENT']),
  defaultOpen: PropTypes.bool,
  logoText: PropTypes.string,
  toggleIcons: PropTypes.shape({
    open: PropTypes.node,
    closed: PropTypes.node
  }),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  linkHoverColor: PropTypes.string,
  onToggle: PropTypes.func
};

Sidebar.defaultProps = {
  userRole: 'ADMIN',
  defaultOpen: true,
  logoText: 'EduV',
  backgroundColor: 'white',
  textColor: 'black',
  borderColor: '#2d3748',
  hoverColor: '#2d3748',
  activeColor: '#01C38D',
  linkHoverColor: '#3182ce',
};

export default Sidebar;