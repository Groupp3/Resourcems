import React, { useState } from "react";
import PropTypes from "prop-types";
import Header from "../Header/Header";
import UserProfileIcon from "../UserProfileIcon/userProfileIcon";
import Modal from "../Modal/Modal";
import "./ProfileLayout.css";

const ProfileLayout = ({ profileSrc, firstName, lastName, email, role, onLogout }) => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="profile-layout">
      <Header />
      <div className="profile-body">
        {/* Left Section - Profile Image */}
        <div className="profile-left">
          <div className="profile-image-wrapper">
            <UserProfileIcon src={profileSrc} size="lg" />
            <button className="edit-btn">+</button>
          </div>
        </div>
        
        {/* Right Section - User Information */}
        <div className="profile-right">
          <div className="profile-info-card">
            <h2 className="profile-name">{firstName} {lastName}</h2>
            <p className="profile-role">{role}</p>
            <div className="profile-detail">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{email}</span>
            </div>
            
            {/* Additional profile information */}
            <div className="profile-detail">
              <span className="detail-label">Member Since:</span>
              <span className="detail-value">January 2023</span>
            </div>
            
            <div className="profile-detail">
              <span className="detail-label">Status:</span>
              <span className="detail-value status-active">Active</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="profile-actions">
            <button className="action-btn settings-btn" onClick={() => setShowModal(true)}>
              Account Settings
            </button>
            <button className="action-btn logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Settings Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Account Settings"
        body={
          <div className="settings-options">
            <div className="settings-option">
              <h3>Change Password</h3>
              <p>Update your password to keep your account secure</p>
              <button className="option-btn">Change Password</button>
            </div>
            <div className="settings-option">
              <h3>Notification Preferences</h3>
              <p>Manage how you receive notifications</p>
              <button className="option-btn">Manage Notifications</button>
            </div>
            <div className="settings-option">
              <h3>Privacy Settings</h3>
              <p>Control your profile visibility and data sharing</p>
              <button className="option-btn">Privacy Settings</button>
            </div>
          </div>
        }
        primaryButtonText="Close"
        onPrimaryClick={() => setShowModal(false)}
      />
    </div>
  );
};

ProfileLayout.propTypes = {
  profileSrc: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  onLogout: PropTypes.func
};

ProfileLayout.defaultProps = {
  profileSrc: "https://via.placeholder.com/150",
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  role: "User",
  onLogout: () => {}
};

export default ProfileLayout;