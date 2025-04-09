import React, { useState } from 'react';
import {
  Play,
  User as UserIcon,
  Globe,
  Lock,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import './VideoCard.css';

const VideoCard = ({ video, onClick, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now - date;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;
    const diffInWeeks = diffInDays / 7;

    if (diffInHours < 24) return `${Math.floor(diffInHours)} hours ago`;
    else if (diffInDays < 7) return `${Math.floor(diffInDays)} days ago`;
    else return `${Math.floor(diffInWeeks)} weeks ago`;
  };

  const minutes = Math.floor(Math.random() * 2);
  const seconds = Math.floor(Math.random() * 60);
  const duration = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  const uploadedBy = video.uploadedBy || 'Unknown';
  const role = video.role || 'Mentor';
  const tags = video.tags?.join(', ') || 'No Tags';

  const handleCardClick = () => {
    if (onClick) onClick(video);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(video);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const thumbnailUrl = video.thumbnailUrl || '/api/placeholder/320/180';

  return (
    <div className="video-card" onClick={handleCardClick}>
      <div className="video-thumbnail">
        <img
          src={thumbnailUrl}
          alt={`${video.title} thumbnail`}
          className="thumbnail-image"
        />
        <div className="duration-badge">{duration}</div>
        <div className="play-button">
          <Play className="play-icon" />
        </div>
      </div>

      <div className="video-info">
      <h3 className="video-title">{video.title}</h3>
      <p className="video-uploaded-time">{formatTimeAgo(video.createdAt)}</p>
      <div className="video-tags">
  {Array.isArray(video.tagNames) && video.tagNames.length > 0 ? (
    video.tagNames.map((tag, idx) => (
      <span key={idx} className="video-tag-pill">
        {tag}
      </span>
    ))
  ) : (
    <span className="video-tag-pill">No Tags</span>
  )}
</div>



        <div className="video-user-details">
          <div className="user-info-left">
            <UserIcon className="user-avatar-icon" />
            <div className="user-text">
              <span className="username">{uploadedBy}</span>
              <span className="user-role">{role}</span>
            </div>
          </div>

          <div className="visibility-icon">
            {video.isPublic ? <Globe /> : <Lock />}
          </div>
        </div>
      </div>

      {/* Moved here: 3-dot menu at bottom right */}
      <div className="menu-wrapper" onClick={toggleMenu}>
        <MoreHorizontal className="menu-icon" />
        {menuOpen && (
          <div className="menu-dropdown">
            <button onClick={handleDelete}>
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
