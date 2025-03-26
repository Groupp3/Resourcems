import React from 'react';
import PropTypes from 'prop-types';
import './ProfileIcon.css';

/**
 * A reusable profile icon component with customizable size and image.
 */
const ProfileIcon = ({ src, alt = 'Profile Image', size = 'md', className = '', onClick }) => {
  const iconClasses = ['profile-icon', size, className].filter(Boolean).join(' ');

  return (
    <div className={iconClasses} onClick={onClick}>
      <img src={src} alt={alt} />
    </div>
  );
};

ProfileIcon.propTypes = {
  /** URL of the profile image */
  src: PropTypes.string.isRequired,
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
