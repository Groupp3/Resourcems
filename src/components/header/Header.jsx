import React from "react";
import PropTypes from "prop-types";
import ProfileIcon from "../ProfileIcon/ProfileIcon"; 
import "./Header.css";

const Header = ({ backgroundColor, textColor, borderColor, profileSrc, profileName, onLogout }) => {
  return (
    <header className="header" style={{ backgroundColor, color: textColor, borderBottom: `2px solid ${borderColor}` }}>
      <div className="header-content container-fluid">
        <div className="row w-100 align-items-center">
          
          <div className="col-10"></div>  
          
          {/* Profile Icon in the 10th column */}
          <div className="col-2 d-flex justify-content-start profile-container ms-auto">
            <ProfileIcon 
              src={profileSrc} 
              name={profileName} 
              size="sm"
              onLogout={onLogout}
            />
          </div>
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