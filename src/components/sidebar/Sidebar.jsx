import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Sidebar.css';
import Logo from "../../assets/logo.svg?url";

// Define menu items for different roles
const MENU_ITEMS = {
  ADMIN: [
    { icon: <i className="bi bi-house-door" />, text: 'Home', path: '/admin' },
    { icon: <i className="bi bi-person" />, text: 'Profile', path: '/admin/profile' },
    { icon: <i className="bi bi-people" />, text: 'Users', path: '/admin/users' },
    { icon: <i className="bi bi-box-seam" />, text: 'Resource', path: '/admin/resource' },
    { icon: <i className="bi bi-clipboard-check" />, text: 'Request', path: '/admin/request' },
  ],
  MENTOR: [
    { icon: <i className="bi bi-house-door" />, text: 'Home', path: '/' },
    { icon: <i className="bi bi-person" />, text: 'Profile', path: '/profile' },
    { icon: <i className="bi bi-people" />, text: 'Students', path: '/users' },
    { icon: <i className="bi bi-box-seam" />, text: 'Resource', path: '/resource' },
  ],
  STUDENT: [
    { icon: <i className="bi bi-house-door" />, text: 'Home', path: '/' },
    { icon: <i className="bi bi-person" />, text: 'Profile', path: '/profile' },
    { icon: <i className="bi bi-people" />, text: 'Mentors', path: '/users' },
    { icon: <i className="bi bi-box-seam" />, text: 'Resource', path: '/resource' },
  ]
};

const Sidebar = ({
  userRole = 'STUDENT',
  defaultOpen = true,
  logoText = 'EduVault',
  toggleIcons,
  backgroundColor = 'white',
  textColor = 'black',
  borderColor = '#2d3748',
  hoverColor = '#2d3748',
  activeColor = '#01C38D',
  linkHoverColor = '#3182ce',
  onToggle
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const location = useLocation();
  const menuItems = MENU_ITEMS[userRole.toUpperCase()] || [];

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (onToggle) onToggle(!isOpen);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--backgroundColor', backgroundColor);
    document.documentElement.style.setProperty('--textColor', textColor);
    document.documentElement.style.setProperty('--borderColor', borderColor);
    document.documentElement.style.setProperty('--hoverColor', hoverColor);
    document.documentElement.style.setProperty('--activeColor', activeColor);
    document.documentElement.style.setProperty('--linkHoverColor', linkHoverColor);
  }, [backgroundColor, textColor, borderColor, hoverColor, activeColor, linkHoverColor]);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
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
            <NavLink 
              to={item.path} 
              className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}
              end
            >
              <span className="icon">{item.icon}</span>
              {isOpen && <span className="text">{item.text}</span>}
            </NavLink>
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

export default Sidebar;
