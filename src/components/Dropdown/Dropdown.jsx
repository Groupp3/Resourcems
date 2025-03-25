import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";

const Dropdown = ({
  options,
  label,
  size,
  direction,
  fullWidth,
  disabled,
  showCaret,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect && onSelect(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`dropdown ${size} ${direction} ${fullWidth ? "full-width" : ""}`}
    >
      <button
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        {selected || label}
        {showCaret && <span className="caret">&#9662;</span>}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  direction: PropTypes.oneOf(["down", "up", "left", "right"]),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  showCaret: PropTypes.bool,
  onSelect: PropTypes.func,
};

Dropdown.defaultProps = {
  label: "Select an option",
  size: "medium",
  direction: "down",
  fullWidth: false,
  disabled: false,
  showCaret: true,
};

export default Dropdown;
