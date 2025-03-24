// src/components/Navbar/Navbar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FaHome, FaCog, FaUserAlt } from 'react-icons/fa';  // Import icons from react-icons
import './Navbar.css';

// A simple Navbar component with dynamic menu items and icons.
const Navbar = ({ brandImage, brandTitle, menuItems, onLogout }) => {
  return (
    <div className="navbar-container">
      <div className="brand">
        <img src={brandImage} alt="Brand" className="brand-image" />
        <h1>{brandTitle}</h1>
      </div>
      
      <div className="menu">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <span className="menu-icon">{item.icon}</span>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      
      <div className="logout">
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  brandImage: PropTypes.string.isRequired,
  brandTitle: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,  // Make sure icon is a React element (e.g. <FaHome />)
    })
  ).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
