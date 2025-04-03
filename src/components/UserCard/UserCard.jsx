import React from "react";
import "./UserCard.css";
import { FaEdit, FaTrash, FaUser, FaUserTie, FaUserGraduate } from "react-icons/fa";

const UserCard = ({ name, email, avatar, accentColor, backgroundGradient, role }) => {
  // Get the appropriate icon based on user role
  const getRoleIcon = () => {
    switch (role) {
      case "Admin":
        return <FaUserTie />;
      case "Mentor":
        return <FaUser />;
      case "Student":
        return <FaUserGraduate />;
      default:
        return <FaUser />;
    }
  };

  return (
    <div 
      className="usercard" 
      data-role={role}
      style={{ 
        background: backgroundGradient,
        borderLeft: `4px solid ${accentColor}`
      }}
    >
      <div className="pattern-overlay"></div>
      
      <div className="card-header">
        <div className="imageContainer">
          <div className="hoverCircle" style={{ backgroundColor: accentColor }}></div>
          <img src={avatar} alt={name} className="avatar" />
        </div>
        
        <div className="card-icon" style={{ color: accentColor, background: `rgba(${accentColor.replace(/[^\d,]/g, '')}, 0.1)` }}>
          {getRoleIcon()}
        </div>
        
      </div>
      
      <div className="user-info">
        <h3 className="name">{name}</h3>
        <p className="email">{email}</p>
        <span className="role" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
          {role}
        </span>
      </div>
      
      <div className="actionButtons">
        <button className="editButton" title="Edit user">
          <FaEdit />
        </button>
        <button className="deleteButton" title="Delete user">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default UserCard;