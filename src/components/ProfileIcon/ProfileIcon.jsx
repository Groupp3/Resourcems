import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown, FaSignOutAlt, FaUser } from 'react-icons/fa';
import './ProfileIcon.css';

const ProfileIcon = ({ 
  name, 
  alt = 'Profile Image', 
  size = 'md', 
  className = '', 
  onLogout 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [token, setToken] = useState('');

  // Load profile image URL and token from localStorage on component mount
  useEffect(() => {
    const storedImageUrl = localStorage.getItem('profileImageUrl'); // Fetch from localStorage key 'profileImageUrl'
    const storedToken = localStorage.getItem('token');
    
    if (storedImageUrl) {
      setProfileImageUrl(storedImageUrl);
    }
    
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
    if (onLogout) onLogout();
  };

  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div className={`profile-icon-container ${className}`}>
      {/* Profile Icon and Name (Always Visible) */}
      <div className="profile-wrapper" onClick={toggleDropdown}>
        <div className={`profile-icon ${size}`}>
          {!imageError && profileImageUrl ? (
            <img 
              src={profileImageUrl} // Directly use the S3 URL from localStorage
              alt={alt} 
              onError={handleImageError}
            />
          ) : (
            <div className="fallback-icon"><FaUser /></div>
          )}
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
  name: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  onLogout: PropTypes.func,
};

export default ProfileIcon;