// ResourceCard.jsx
import React from "react";
import "./ResourceCard.css";
import { BookIcon } from "lucide-react";

const ResourceCard = ({ title = "Documents", noFiles = 0, color = "#ff9900" }) => {
  return (
    <div className="resource-card">
      <div className="icon-section">
        <div className="icon-wrapper" style={{ backgroundColor: color }}>
          <BookIcon size={20} />
        </div>
        <h3>{title}</h3>
      </div>
      <p className="storage-text">{noFiles} files</p>
    </div>
  );
};

export default ResourceCard;
