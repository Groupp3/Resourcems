import React, { useState, useRef, useEffect } from "react";
import "./UserMSCard.css";
import { FaUserShield, FaUserTie, FaUserGraduate, FaCamera } from "react-icons/fa";

const UserMSCard = ({ userId, name, email, avatar, role }) => {
  const [showAvatarOverlay, setShowAvatarOverlay] = useState(false);
  const menuRef = useRef(null);

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
      <div className="card-header-bg" style={{ background: background }}>
        <div className="pattern-overlay"></div>
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

export default UserMSCard;
