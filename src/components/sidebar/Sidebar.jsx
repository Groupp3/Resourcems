import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo'; 
import './Sidebar.css';


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
  userRole = 'STUDENT',
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      
      if (mobile) {
        setIsOpen(false);
      } else {
        
        setIsOpen(defaultOpen);
      }
    };

    
    window.addEventListener('resize', handleResize);
    
    
    handleResize();

   
    return () => window.removeEventListener('resize', handleResize);
  }, [defaultOpen]);

  
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

  const renderMobileHeader = () => (
    <div className="mobile-header">
      <Logo 
        size={40} 
        onClick={handleToggle} 
        className="mobile-logo"
      />
    </div>
  );

 
  const renderSidebar = () => (
    <div 
      className={`sidebar ${isOpen ? 'open' : 'closed'} ${isMobile ? 'mobile-sidebar' : ''}`} 
      style={cssVariables}
    >
     
      {(!isMobile || isOpen) && (
        <div className="sidebar-header" onClick={handleToggle}> 
          <Logo 
            size={30} 
            text={isOpen ? logoText : ''} 
            className="sidebar-logo"
          />
          {toggleIcons && (
            <span className="toggle-icon">
              {isOpen ? toggleIcons.open : toggleIcons.closed}
            </span>
          )}
        </div>
      )}
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <Link 
              to={item.path} 
              className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => isMobile && setIsOpen(false)} 
            >
              <span className="icon">{item.icon}</span>
              {isOpen && <span className="text">{item.text}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      {isMobile && renderMobileHeader()}
      {renderSidebar()}
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

Sidebar.defaultProps = {
  userRole: 'STUDENT',
  defaultOpen: true,
  logoText: 'EduVault',
  backgroundColor: '#132D46',
  textColor: '#ffffff',
  borderColor: '#2d3748',
  hoverColor: '#2d3748',
  activeColor: '#01C38D',
  linkHoverColor: '#3182ce',
};

export default Sidebar;