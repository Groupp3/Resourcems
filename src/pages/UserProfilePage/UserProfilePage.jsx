import React, { useState } from "react";
import UserLayout from "../../layouts/UserLayout/UserLayout";
import UserProfileIcon from "../../components/UserProfileIcon/UserProfileIcon";
import Modal from "../../components/Modal/Modal";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@gmail.com",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000);
  };

  const handleAddProfileClick = () => {
    console.log("Add profile clicked");
  };

  return (
    <UserLayout>
      <div className="profile-layout"> 
        <div className="user-profile-page">
         
          <div className="profile-content">
            <div className="profile-section">
              <div className="profile-icon-wrapper">
                <UserProfileIcon 
                  user={{
                    name: `${profile.firstName} ${profile.lastName}`,
                    profileImage: profile.avatar
                  }}
                  size={120}
                  onAddClick={handleAddProfileClick}
                />
              </div>
            </div>
            <div className="profile-details">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={profile.firstName} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={profile.lastName} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={profile.email} disabled />
              </div>
              <div className="profile-actions">
                <button className="change-password-btn" onClick={() => setModalOpen(true)}>Change Password</button>
                <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
              </div>
            </div>
          </div>
          {isPopupVisible && (
            <div className="popup-message">
              <div className="popup-content">
                <span className="popup-icon">✓</span>
                <p>Profile updated successfully!</p>
              </div>
            </div>
          )}
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Change Password">
            <div className="modal-body">
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="save-btn">Update Password</button>
            </div>
          </Modal>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserProfilePage;
