import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown, FaSignOutAlt } from 'react-icons/fa'; // Import Logout Icon
import './ProfileIcon.css';

const ProfileIcon = ({ src, name, alt = 'Profile Image', size = 'md', className = '', onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <div className={`profile-icon-container ${className}`}>
      {/* Profile Icon and Name (Always Visible) */}
      <div className="profile-wrapper" onClick={toggleDropdown}>
        <div className={`profile-icon ${size}`}>
          <img src={src} alt={alt} />
        </div>
        {name && <span className="profile-name">{name}</span>}
        <FaChevronDown className="dropdown-icon" />
      </div>

      {/* Dropdown (Only Logout Option) */}
      {isOpen && (
        <div className="profile-dropdown">
          <button className="dropdown-item logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

ProfileIcon.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  onLogout: PropTypes.func,
};

export default ProfileIcon;
