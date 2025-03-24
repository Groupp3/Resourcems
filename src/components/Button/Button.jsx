// Button.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * A reusable Bootstrap-styled button component with customizable properties
 */
const Button = ({
  label,
  variant = 'primary',
  size = 'md',
  outlined = false,
  disabled = false,
  block = false,
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  // Determine the button's classes based on props
  const buttonClasses = [
    'btn',
    outlined ? `btn-outline-${variant}` : `btn-${variant}`,
    size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '',
    block ? 'btn-block' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /** Button text */
  label: PropTypes.string.isRequired,
  /** Button color variant */
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']),
  /** Button size */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /** Whether the button has an outline style */
  outlined: PropTypes.bool,
  /** Whether the button is disabled */
  disabled: PropTypes.bool,
  /** Whether the button should be a block-level button */
  block: PropTypes.bool,
  /** Click handler function */
  onClick: PropTypes.func,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Button type attribute */
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

export default Button;