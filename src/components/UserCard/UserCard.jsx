import React from "react";
import "./UserCard.css"; // ✅ Regular CSS import
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons

const UserCard = ({ name, email, avatar, accentColor, role }) => {
  return (
    <div className="usercard">
      <div className="accent" style={{ backgroundColor: accentColor }} />
      <div className="imageContainer">
        <div className="hoverCircle" style={{ backgroundColor: accentColor }} />
        <img src={avatar} alt={name} className="avatar" />
        <div className="imageAccent" style={{ backgroundColor: accentColor }} />
      </div>
      <h3 className="name">{name}</h3>
    
      <p className="email">{email}</p>
      <p className="role">{role}</p> {/* ✅ Role passed dynamically */}

      {/* Edit & Delete Icons */}
      <div className="actionButtons">
        <button className="editButton">
          <FaEdit />
        </button>
        <button className="deleteButton">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
