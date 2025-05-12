import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaSignOutAlt, FaUser } from 'react-icons/fa';
import AuthService from '../../services/AuthService'; // Adjust path if needed
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
  const navigate = useNavigate();

  useEffect(() => {
    const storedImageUrl = localStorage.getItem('profileImageUrl');
    const storedToken = localStorage.getItem('token');
    
    if (storedImageUrl) setProfileImageUrl(storedImageUrl);
    if (storedToken) setToken(storedToken);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await AuthService.logout();
      if (onLogout) onLogout();
    } catch (error) {
      console.error('Logout API failed:', error);
    } finally {
      navigate('/auth');
    }
  };

  const handleImageError = () => setImageError(true);

  return (
    <div className={`profile-icon-container ${className}`}>
      <div className="profile-wrapper" onClick={toggleDropdown}>
        <div className={`profile-icon ${size}`}>
          {profileImageUrl && !imageError ? (
            <img 
              src={profileImageUrl}
              alt={alt} 
              onError={handleImageError}
            />
          ) : (
            <div className="fallback-icon" role="img" aria-label="Default profile icon">
              <FaUser />
            </div>
          )}
        </div>
        {name && <span className="profile-name">{name}</span>}
        <FaChevronDown className="dropdown-icon" />
      </div>

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
