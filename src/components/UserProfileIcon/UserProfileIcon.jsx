import React, { useState, useRef, useEffect } from 'react';
import './UserProfileIcon.css';

const UserProfileIcon = ({ 
  user = { 
    name: 'John Doe', 
    profileImage: '/api/placeholder/200/200' 
  },
  size = 100,
  onProfileClick = () => {},
  onLogout = () => {},
  onProfileUpdate = () => {},
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setSelectedFile(objectUrl);
      onProfileUpdate && onProfileUpdate(file);
    }
  };

  const handleAddButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="profile-icon-container" ref={dropdownRef} style={{ zIndex: 1000 }}>
      <div className="profile-avatar-wrapper mb-3">
        <div className="profile-wrapper" onClick={toggleDropdown}>
          <div className="profile-icon-wrapper">
            <div className="user-profile-icon" style={iconStyle}>
              <img src={selectedFile || user.profileImage} alt={`${user.name}'s profile`} />
            </div>
            <button 
              className="add-profile-button" 
              style={addButtonStyle}
              onClick={(e) => {
                e.stopPropagation();
                handleAddButtonClick();
              }}
            >
              +
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>
        </div>
      </div>

      {/* {dropdownOpen && (
        <div className="profile-dropdown">
          <button className="dropdown-item" onClick={onProfileClick}>
            <i className="profile-icon">👤</i> View Profile
          </button>
          <button className="dropdown-item">
            <i className="settings-icon">⚙️</i> Settings
          </button>
          <button className="dropdown-item logout-btn" onClick={onLogout}>
            <i className="logout-icon">🚪</i> Logout
          </button>
        </div>
      )} */}
    </div>
  );
};

export default UserProfileIcon;