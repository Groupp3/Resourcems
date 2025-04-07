import React, { useState, useRef, useEffect } from "react";
import "./UserCard.css";
import {
  FaTrashAlt,
  FaUserShield,
  FaUserTie,
  FaUserGraduate,
  FaEllipsisH,
  FaPencilAlt,
  FaCamera
} from "react-icons/fa";

const UserCard = ({ name, email, avatar, role, onRoleChange, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAvatarOverlay, setShowAvatarOverlay] = useState(false);
  const menuRef = useRef(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Gradient + border style
  const getAccentStyle = (role) => {
    const normalizedRole = role?.toLowerCase();
    switch (normalizedRole) {
      case "admin":
        return {
          background: "linear-gradient(135deg, #e9f9ff 0%, #d6f2ff 100%)",
          borderColor: "#4ecaff"
        };
      case "mentor":
        return {
          background: "linear-gradient(135deg, #f7f1ff 0%, #e8e0ff 100%)",
          borderColor: "#7e64ff"
        };
      case "student":
        return {
          background: "linear-gradient(135deg, #fff3ec 0%, #ffe8d9 100%)",
          borderColor: "#ff8d4e"
        };
      default:
        return {
          background: "#f8f9fa",
          borderColor: "#6c757d"
        };
    }
  };

  const { background, borderColor } = getAccentStyle(role);

  const handleRoleChange = (newRole) => {
    if (onRoleChange) {
      onRoleChange(newRole);
    }
    setMenuOpen(false);
  };

  const getRoleIcon = () => {
    const normalizedRole = role?.toLowerCase();
    switch (normalizedRole) {
      case "admin":
        return <FaUserShield />;
      case "mentor":
        return <FaUserTie />;
      case "student":
        return <FaUserGraduate />;
      default:
        return <FaUserTie />;
    }
  };

  return (
    <div
      className="usercard"
      data-role={role}
      style={{
        borderBottom: `4px solid ${borderColor}`,
      }}
    >
      {/* Gradient header */}
      <div
        className="card-header-bg"
        style={{ background: background }}
      >
        <div className="pattern-overlay"></div>
      </div>

      {/* Top right buttons - VISIBLE ON HOVER */}
      <div className="top-actions">
        <div className="menu-container" ref={menuRef}>
          <button 
            className="menu-button" 
            title="Change role"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaEllipsisH />
          </button>
          
          {menuOpen && (
            <div className="role-menu">
              <div className="role-menu-title">Change Role</div>
              <button 
                className="role-option"
                onClick={() => handleRoleChange("admin")}
                style={role.toLowerCase() === "admin" ? {backgroundColor: "rgba(78, 202, 255, 0.1)"} : {}}
              >
                <FaUserShield /> Admin
              </button>
              <button 
                className="role-option"
                onClick={() => handleRoleChange("mentor")}
                style={role.toLowerCase() === "mentor" ? {backgroundColor: "rgba(126, 100, 255, 0.1)"} : {}}
              >
                <FaUserTie /> Mentor
              </button>
              <button 
                className="role-option"
                onClick={() => handleRoleChange("student")}
                style={role.toLowerCase() === "student" ? {backgroundColor: "rgba(255, 141, 78, 0.1)"} : {}}
              >
                <FaUserGraduate /> Student
              </button>
            </div>
          )}
        </div>
        <button 
          className="top-delete-button" 
          title="Delete user"
          onClick={() => onDelete && onDelete()}
        >
          <FaTrashAlt />
        </button>
      </div>

      <div className="card-content">
        <div className="card-header">
          <div 
            className="imageContainer"
            onMouseEnter={() => setShowAvatarOverlay(true)}
            onMouseLeave={() => setShowAvatarOverlay(false)}
          >
            <div
              className="hoverCircle"
              style={{ backgroundColor: borderColor }}
            >
              {showAvatarOverlay && (
                <div className="avatar-overlay">
                  <FaCamera className="avatar-edit-icon" />
                </div>
              )}
            </div>
            <img src={avatar || "https://via.placeholder.com/150"} alt={name} className="avatar" />
          </div>
        </div>

        <div className="user-info">
          <h3 className="name">{name}</h3>
          <p className="email">{email}</p>
          <span
            className="role"
            style={{
              backgroundColor: `${borderColor}20`,
              color: borderColor,
            }}
          >
            {getRoleIcon()} &nbsp; {role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;