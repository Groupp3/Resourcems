import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import { getUserProfile } from "../../services/AdminService"; // Fixed import
import "./Header.css";

const Header = ({ backgroundColor, textColor, borderColor, profileSrc, onLogout, children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [profileName, setProfileName] = useState("Loading...");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const fetchProfileName = async () => {
      try {
        const user = await getUserProfile();
        if (user) {
          const fullName = `${user.firstName} ${user.lastName}`;
          setProfileName(fullName);
        } else {
          setProfileName("User");
        }
      } catch (error) {
        console.error("Failed to fetch user profile");
        setProfileName("User");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    fetchProfileName();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="header" style={{ backgroundColor, color: textColor, borderBottom: `2px solid ${borderColor}` }}>
      <div className="header-content container-fluid d-flex justify-content-between align-items-center">
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
  onLogout: PropTypes.func,
  children: PropTypes.node
};

Header.defaultProps = {
  backgroundColor: "#FFFFFF",
  textColor: "#2D3748",
  borderColor: "#E2E8F0",
  profileSrc: "https://via.placeholder.com/100",
  onLogout: () => {}
};

export default Header;
