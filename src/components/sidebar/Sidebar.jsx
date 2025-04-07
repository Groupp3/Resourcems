import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Sidebar.css';
import Logo from "../../assets/logo.svg?url";
 
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
  userRole = '',
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const menuItems = MENU_ITEMS[userRole.toUpperCase()] || [];
 
  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (onToggle) onToggle(!isOpen);
    
    // Toggle body class for coordinating with header
    if (isMobile) {
      document.body.classList.toggle('sidebar-open', !isOpen);
    }
  };
 
  const handleResize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    
    // Default closed state for mobile
    if (mobile && !isMobile) {
      setIsOpen(false);
      document.body.classList.remove('sidebar-open');
    } else if (!mobile && isMobile && !isOpen) {
      setIsOpen(true);
    }
    
    // Set mobile-view class on body
    document.body.classList.toggle('mobile-view', mobile);
  };
 
  useEffect(() => {
    document.documentElement.style.setProperty('--backgroundColor', backgroundColor);
    document.documentElement.style.setProperty('--textColor', textColor);
    document.documentElement.style.setProperty('--borderColor', borderColor);
    document.documentElement.style.setProperty('--hoverColor', hoverColor);
    document.documentElement.style.setProperty('--activeColor', activeColor);
    document.documentElement.style.setProperty('--linkHoverColor', linkHoverColor);
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('sidebar-open', 'mobile-view');
    };
  }, [backgroundColor, textColor, borderColor, hoverColor, activeColor, linkHoverColor]);
 
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar');
      const mobileLogoContainer = document.querySelector('.mobile-logo-container');
      
      if (isMobile && isOpen &&
          sidebar &&
          !sidebar.contains(event.target) &&
          mobileLogoContainer &&
          !mobileLogoContainer.contains(event.target)) {
        setIsOpen(false);
        document.body.classList.remove('sidebar-open');
        if (onToggle) onToggle(false);
      }
    };
 
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isOpen, onToggle]);
 
  return (
    <>
      {/* Mobile Header Logo - only appears in mobile view */}
      {isMobile && (
        <div className="mobile-logo-wrapper">
          <div className="mobile-logo-container" onClick={handleToggle}>
            <img src={Logo} alt="Brand Logo" className="brand-logo" />
            <span className="logo">{logoText}</span>
          </div>
        </div>
      )}
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : ''}`}>
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
      
      
      {isMobile && isOpen && <div className="sidebar-overlay" onClick={handleToggle}></div>}
    </>
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
 