// src/components/Card/Card.jsx
import React from "react";
import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";  // Default icon if no icon is passed
import "./Card.css";

const Card = ({ title, description, image, size, onClick, disabled, icon }) => {
  return (
    <div className={`card card-${size} ${disabled ? "disabled" : ""}`} onClick={disabled ? null : onClick}>
      <div className="card-image">
        <img
          src={image || "https://via.placeholder.com/300"}  // Default placeholder image
          alt={title || "Card Image"}
        />
      </div>
      <div className="card-body">
        <div className="card-title-container">
          {icon && <span className="card-icon">{icon}</span>} {/* Add icon here */}
          <h5 className="card-title">{title || "Placeholder Title"}</h5>
        </div>
        <div className="card-description">
          {description ? <h3>{description}</h3> : null} {/* Display number if description is passed */}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.element,  // Added prop for icon
};

Card.defaultProps = {
  size: "medium",
  disabled: false,
  title: "Placeholder Title",
  description: "This is a placeholder description for the card.",
  image: "https://via.placeholder.com/300",  // Default placeholder image
  icon: <FaUser />  // Default icon if none provided
};

export default Card;

