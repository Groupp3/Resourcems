import React from 'react';
import PropTypes from 'prop-types';
import './Breadcrumb.css';

/**
 * A reusable Bootstrap-styled breadcrumb navigation component
 */
const Breadcrumb = ({ 
  items, 
  separator = '/', 
  className = '', 
  activeClassName = 'active', 
  onClick,
  ...props 
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  // Handle custom separator styling via CSS custom property
  const navStyle = {
    '--breadcrumb-divider': `'${separator}'`
  };

  return (
    <nav aria-label="breadcrumb" style={navStyle} {...props}>
      <ol className={`breadcrumb ${className}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const itemClassName = isLast ? `breadcrumb-item ${activeClassName}` : 'breadcrumb-item';
          
          return (
            <li 
              key={`breadcrumb-item-${index}`} 
              className={itemClassName} 
              aria-current={isLast ? 'page' : undefined}
            >
              {isLast ? (
                item.label
              ) : (
                item.url ? (
                  <a 
                    href={item.url} 
                    onClick={(e) => {
                      if (onClick) {
                        e.preventDefault();
                        onClick(item, index);
                      }
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  item.label
                )
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  /** Array of breadcrumb items with label and optional URL */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string
    })
  ).isRequired,
  /** Custom separator between breadcrumb items */
  separator: PropTypes.string,
  /** Additional CSS class for the breadcrumb */
  className: PropTypes.string,
 
  activeClassName: PropTypes.string,

  onClick: PropTypes.func
};

export default Breadcrumb;



























