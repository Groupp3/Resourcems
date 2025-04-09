import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header/Header";
import UserProfileIcon from "../../components/UserProfileIcon/UserProfileIcon";
import { FaUser, FaKey, FaSave, FaEdit, FaLock, FaEnvelope, FaUserTag } from "react-icons/fa";
import { getUserProfile, updateUserProfile, changeUserPassword } from "../../services/AdminService"; // Adjust the import path as needed
import "./ProfileLayout.css";

// Improved Modal Component
const Modal = ({ isOpen, onClose, title, primaryButtonText, onPrimaryClick, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={onPrimaryClick}
            >
              {primaryButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    avatar: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile();
      
      // Extract data from the response structure
      const userData = response;

      if (userData) {
        setProfile({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          role: userData.role || "",
          email: userData.email || "",
          avatar: userData.profileImageUrl || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const saveProfileChanges = async () => {
    try {
      const updateDTO = {
        firstName: profile.firstName,
        lastName: profile.lastName,
      };

      await updateUserProfile(updateDTO);
      alert("Profile updated successfully");
      setShowEditForm(false);
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  const savePasswordChanges = async () => {
    try {
      // Validate passwords
      if (passwords.newPassword !== passwords.confirmPassword) {
        alert("New password and confirmation do not match");
        return;
      }

      if (!passwords.currentPassword || !passwords.newPassword) {
        alert("Please fill in all password fields");
        return;
      }

      // Implementation for the password change API call - matches ProfileService approach
      const passwordData = {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      };

      // Call the service function
      await changeUserPassword(passwordData);
      
      // Success handling
      alert("Password changed successfully");
      setIsModalOpen(false);
      
      // Reset password fields
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      // Show more specific error messages based on the error response
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Failed to change password. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  return (
    <div className="container-fluid">
      <Header 
        profileSrc={profile.avatar}
        profileName={`${profile.firstName} ${profile.lastName}`}
        onLogout={() => alert("Logout clicked")}
      />
      
      {/* Enhanced Profile Header Section with Avatar and User Info */}
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card profile-header-panel">
            <div className="pattern-overlay"></div>
            <div className="card-body">
              <div className="row align-items-center">
                {/* Left Side - Profile Avatar */}
                <div className="col-md-3 text-center">
                  <UserProfileIcon avatar={profile.avatar} />
                  <h5 className="mb-2">{profile.firstName} {profile.lastName}</h5>
                  <p className="text-muted small mb-3">{profile.email}</p>
              
                </div>
                
                {/* Middle - User Information */}
                <div className="col-md-6">
                  <div className="user-profile-info">
                    <h3 className="mb-2">{profile.firstName} {profile.lastName}</h3>
                    <div className="permanent-field">
                      <FaUserTag className="permanent-icon" />
                      <p className="role-badge">{profile.role}</p>
                    </div>
                    <div className="permanent-field">
                      <FaEnvelope className="permanent-icon" />
                      <p className="mb-1 text-muted">{profile.email}</p>
                    </div>
                
                    <button 
                      className="btn btn-outline-primary edit-profile-btn"
                      onClick={toggleEditForm}
                    >
                      <FaEdit className="me-2" />
                      {showEditForm ? "Cancel Editing" : "Edit Profile"}
                    </button>
                  </div>
                </div>

                {/* Right Side - Edit Button */}
                <div className="col-md-3 d-flex justify-content-center justify-content-md-end">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Content Section - Details Form (Conditional Rendering) */}
      {showEditForm && (
        <div className="row">
          <div className="col-12">
            <div className="card profile-details-card">
              <div className="card-body">
                <h4 className="card-title mb-4">Edit Personal Details</h4>
                
                <form>
                  
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="role" className="form-label d-flex align-items-center">
                      Role
                      <FaLock className="ms-2 lock-icon" />
                    </label>
                    <div className="input-group">
                      <span className="input-group-text locked-field-icon">
                        <FaUserTag />
                      </span>
                      <input 
                        type="text" 
                        className="form-control locked-field" 
                        id="role"
                        name="role"
                        value={profile.role}
                        readOnly
                      />
                    </div>
                    <div className="form-text text-muted">Your role cannot be changed</div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label d-flex align-items-center">
                      Email
                      <FaLock className="ms-2 lock-icon" />
                    </label>
                    <div className="input-group">
                      <span className="input-group-text locked-field-icon">
                        <FaEnvelope />
                      </span>
                      <input 
                        type="email" 
                        className="form-control locked-field" 
                        id="email"
                        value={profile.email} 
                        readOnly 
                      />
                    </div>
                    <div className="form-text text-muted">Your email address cannot be changed</div>
                  </div>
                  
                  <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mt-4">
                    <button 
                      type="button" 
                      className="btn btn-outline-primary password-btn"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <FaKey className="me-2" />
                      Change Password
                    </button>
                    
                    <button 
                      type="button" 
                      className="btn btn-primary save-btn"
                      onClick={saveProfileChanges}
                    >
                      <FaSave className="me-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Modal Implementation */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Change Password"
          primaryButtonText="Save Password"
          onPrimaryClick={savePasswordChanges}
        >
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">Current Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="currentPassword"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="confirmPassword"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProfileLayout;