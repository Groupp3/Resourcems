import React from 'react';
import PropTypes from 'prop-types';
import './ProfileIcon.css';

/**
 * A reusable profile icon component with a customizable image and name.
 */
const ProfileIcon = ({ src, name, alt = 'Profile Image', size = 'md', className = '', onClick }) => {
  return (
    <div className={`profile-icon-container ${className}`} onClick={onClick}>
      <div className={`profile-icon ${size}`}>
        <img src={src} alt={alt} />
      </div>
      {name && <span className="profile-name">{name}</span>}
    </div>
  );
};

ProfileIcon.propTypes = {
  /** URL of the profile image */
  src: PropTypes.string.isRequired,
  /** Name of the profile user */
  name: PropTypes.string,
  /** Alternative text for the image */
  alt: PropTypes.string,
  /** Size of the profile icon */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Click handler function */
  onClick: PropTypes.func,
};

export default ProfileIcon;
