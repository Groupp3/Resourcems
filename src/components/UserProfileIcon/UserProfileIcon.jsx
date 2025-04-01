import React, { useState, useRef, useEffect } from 'react';
import './UserProfileIcon.css';

const UserProfileIcon = ({ 
  user = { 
    name: 'John Doe', 
    profileImage: '/api/placeholder/200/200' 
  },
  size = 60,
  onProfileClick = () => {},
  onLogout = () => {},
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const dropdownRef = useRef(null);

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
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-icon-container" ref={dropdownRef}>
      <div className="profile-wrapper" onClick={toggleDropdown}>
        <div className="profile-icon-wrapper">
          <div className="profile-icon" style={iconStyle}>
            <img src={selectedFile || user.profileImage} alt={`${user.name}'s profile`} />
          </div>
          <button 
            className="add-profile-button" 
            style={addButtonStyle} 
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
          >
            +
          </button>
        </div>
        <div className="profile-info">
          <div className="profile-name">{user.name}</div>
         
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileIcon;