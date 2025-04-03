import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProfileIcon from "../ProfileIcon/ProfileIcon"; 
import "./Header.css";

const Header = ({ backgroundColor, textColor, borderColor, profileSrc, profileName, onLogout, children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header 
      className="app-header" 
      style={{ 
        backgroundColor, 
        color: textColor, 
        borderBottom: `1px solid ${borderColor}` 
      }}
    >
      <div className="header-content">
        <div className="header-left">
          {children}
        </div>
        
        <div className="header-right">
          <div className="profile-container">
            <ProfileIcon src={profileSrc} alt={profileName} />
            <span className="profile-name">{profileName}</span>
            <button 
              className="logout-button" 
              onClick={onLogout}
              aria-label="Logout"
            >
              <i className="bi bi-box-arrow-right"></i>
            </button>
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
  onLogout: PropTypes.func,
  children: PropTypes.node
};

Header.defaultProps = {
  backgroundColor: "#FFFFFF",
  textColor: "#2D3748",
  borderColor: "#E2E8F0",
  profileSrc: "https://via.placeholder.com/100",
  profileName: "Admin",
  onLogout: () => {}
};

export default Header;