import React, { useState, useRef, useEffect } from 'react';
import './UserProfileIcon.css';

const UserProfileIcon = ({ 
  user = { 
    name: 'John Doe', 
    profileImage: '/api/placeholder/200/200' 
  },
  size = 60,
  onAddClick = () => {},
  onLogout = () => {},
  onProfileClick = () => {}
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Calculate styles based on size prop
  const iconStyle = {
    width: `${size}px`,
    height: `${size}px`
  };

  const addButtonStyle = {
    width: `${size * 0.35}px`,
    height: `${size * 0.35}px`,
    fontSize: `${size * 0.2}px`
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-icon-container" ref={dropdownRef}>
      <div className="profile-wrapper" onClick={toggleDropdown}>
        <div className="profile-icon-wrapper">
          <div className="profile-icon" style={iconStyle}>
            <img src={user.profileImage} alt={`${user.name}'s profile`} />
          </div>
          <button 
            className="add-profile-button" 
            style={addButtonStyle} 
            onClick={(e) => {
              e.stopPropagation(); // Prevent dropdown from opening
              onAddClick();
            }}
          >
            +
          </button>
        </div>
        <div className="profile-info">
          <div className="profile-name">{user.name}</div>
          <span className="dropdown-icon">{dropdownOpen ? '▲' : '▼'}</span>
        </div>
      </div>

      {dropdownOpen && (
        <div className="profile-dropdown">
          <button className="dropdown-item" onClick={onProfileClick}>
            <span className="profile-icon">👤</span> View Profile
          </button>
          <button className="dropdown-item">
            <span className="settings-icon">⚙️</span> Settings
          </button>
          <button className="dropdown-item logout-btn" onClick={onLogout}>
            <span className="logout-icon">🚪</span> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileIcon;