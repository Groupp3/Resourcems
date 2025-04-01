import React from 'react';
import PropTypes from 'prop-types';
import './Logo.css';
import LogoSvg from "../../assets/logo.svg?url";

const Logo = ({
  size = 40, 
  onClick, 
  className = '', 
  alt = 'Brand Logo', 
  text = 'EduV'
}) => {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div 
      className={`logo-container ${className}`} 
      onClick={handleClick}
    >
      <img 
        src={LogoSvg} 
        alt={alt} 
        className="brand-logo" 
        style={{ 
          width: `${size}px`, 
          height: `${size}px` 
        }} 
      />
      {text && <span className="logo-text">{text}</span>}
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
  alt: PropTypes.string,
  text: PropTypes.string
};

export default Logo;