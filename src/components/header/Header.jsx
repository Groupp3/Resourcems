import React from "react";
import PropTypes from "prop-types";
import ProfileIcon from "../ProfileIcon/ProfileIcon"; 
import "./Header.css";

const Header = ({ backgroundColor, textColor, borderColor, profileSrc, profileName, onLogout }) => {
  return (
    <header className="header" style={{ backgroundColor, color: textColor, borderBottom: `2px solid ${borderColor}` }}>
      <div className="header-content container-fluid d-flex justify-content-between align-items-center">
        {/* Other header content (if needed) */}

        {/* Profile Icon at the top-right */}
        <div className="profile-container">
          <ProfileIcon 
            src={profileSrc} 
            name={profileName} 
            size="sm"
            onLogout={onLogout}
          />
        </div>
      </div>
    </header>
  );
};



Header.propTypes = {
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  borderColor: PropTypes.string,
  profileSrc: PropTypes.string,
  profileName: PropTypes.string,
  onLogout: PropTypes.func
};

Header.defaultProps = {
  backgroundColor: "#132D46",
  textColor: "#FFFFFF",
  borderColor: "#2d3748",
  profileSrc: "https://via.placeholder.com/100",
  profileName: "Admin",
  onLogout: () => {}
};

export default Header;
