import React, { useState, useRef, useEffect } from "react";
import "./UserProfileIcon.css";

const UserProfileIcon = ({ 
  avatar = "/api/placeholder/200/200", 
  name = "John Doe",
  size = 100,
  onProfileUpdate = () => {},
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const iconStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #ddd",
  };

  const addButtonStyle = {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    width: `${size * 0.35}px`,
    height: `${size * 0.35}px`,
    fontSize: `${size * 0.2}px`,
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setSelectedFile(objectUrl);
      onProfileUpdate && onProfileUpdate(file);
    }
  };

  return (
    <div className="profile-icon-container" style={{ position: "relative" }}>
      <div className="profile-icon-wrapper" style={iconStyle}>
        <img
          src={selectedFile || avatar}
          alt={`${name}'s profile`}
          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
        />
      </div>
      <button 
        className="add-profile-button" 
        style={addButtonStyle}
        onClick={() => fileInputRef.current.click()}
      >
        +
      </button>
      <input 
        type="file" 
        ref={fileInputRef}
        style={{ display: "none" }} 
        accept="image/*" 
        onChange={handleFileChange} 
      />
    </div>
  );
};

export default UserProfileIcon;
