import React, { useState } from 'react';
import './Searchbar.css';

const SearchBar = ({
  placeholder = 'Search...',
  onSearch,
  onChange,
  value,
  type = 'text',
  name,
  id,
  disabled = false,
  required = false,
  autoComplete = 'off',
  ariaLabel = 'Search',
  iconPosition = 'left',
  clearable = true,
  className = '',
  inputClassName = '',
  iconClassName = '',
  onClear,
  loading = false,
  errorMessage = '',
  ...restProps
}) => {
  const [internalValue, setInternalValue] = useState(value || '');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    
    // Call onChange if provided
    if (onChange) {
      onChange(e);
    }

    // Call onSearch if provided
    if (onSearch) {
      onSearch(newValue);
    }
  };

  const handleClear = () => {
    setInternalValue('');
    
    // Create a synthetic event for consistency
    const clearEvent = {
      target: { 
        name: name || '', 
        value: '',
        type: 'text'
      }
    };

    if (onChange) {
      onChange(clearEvent);
    }

    if (onSearch) {
      onSearch('');
    }

    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={`search-bar-container ${className}`}>
      <div 
        className={`search-bar-wrapper ${
          iconPosition === 'left' ? 'icon-left' : 'icon-right'
        } ${errorMessage ? 'has-error' : ''}`}
      >
        {iconPosition === 'left' && (
          <span className={`search-icon left-icon ${iconClassName}`}>
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            )}
          </span>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={internalValue}
          onChange={handleChange}
          name={name}
          id={id}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-label={ariaLabel}
          className={`search-bar-input ${inputClassName}`}
          {...restProps}
        />

        {clearable && internalValue && !disabled && (
          <button 
            type="button" 
            className="clear-button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}

        {iconPosition === 'right' && (
          <span className={`search-icon right-icon ${iconClassName}`}>
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            )}
          </span>
        )}
      </div>

      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
};

export default SearchBar;