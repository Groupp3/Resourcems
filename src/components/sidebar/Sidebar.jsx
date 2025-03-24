import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Sidebar.css';
import Logo from "../../assets/logo.svg";

const Sidebar = ({
  defaultOpen,
  logoText,
  toggleIcons,
  menuItems,
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
  defaultOpen: PropTypes.bool,
  logoText: PropTypes.string,
  toggleIcons: PropTypes.shape({
    open: PropTypes.node,
    closed: PropTypes.node
  }),
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      text: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  ),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  linkHoverColor: PropTypes.string,
  onToggle: PropTypes.func
};

Sidebar.defaultProps = {
  defaultOpen: true,
  logoText: 'EduV',
  backgroundColor: '#132D46',
  textColor: '#ffffff',
  borderColor: '#2d3748',
  hoverColor: '#2d3748',
  activeColor: '#01C38D',
  linkHoverColor: '#3182ce',
  menuItems: []
};

export default Sidebar;
