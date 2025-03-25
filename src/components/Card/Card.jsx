import React from "react";
import PropTypes from "prop-types";
import "./Card.css"; // Import the CSS file for styling

const Card = ({ title, description, image, size, onClick, disabled }) => {
  return (
    <div className={`card card-${size} ${disabled ? "disabled" : ""}`} onClick={disabled ? null : onClick}>
      <div className="card-image">
        <img
          src={image || "https://via.placeholder.com/300"}  // Default placeholder image
          alt={title || "Card Image"}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{title || "Placeholder Title"}</h5>  {/* Default placeholder title */}
        <p className="card-description">
          {description || "This is a placeholder description for the card."} {/* Default placeholder description */}
        </p>
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
};

Card.defaultProps = {
  size: "medium",
  disabled: false,
  title: "Placeholder Title",
  description: "This is a placeholder description for the card.",
  image: "https://via.placeholder.com/300",  // Default placeholder image
};

export default Card;
