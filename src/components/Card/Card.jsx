import React from "react";
import "./Card.css"; // Make sure this file exists

const Card = ({ title, description, size, onClick, disabled, icon, showImage, color }) => {
  return (
    <div 
      className={`card card-${size} ${disabled ? "disabled" : ""}`} 
      onClick={disabled ? null : onClick}
      style={{ background: color || "linear-gradient(to bottom right, #ddd6fe, #f5f3ff)", color: "#000" }}

    >
      <div className="card-body">
        <div className="card-title-container">
          {icon && <span className="card-icon">{icon}</span>}
          <h5 className="card-title">{title}</h5>
        </div>
        <div className="card-description">
          <h3>{description}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
