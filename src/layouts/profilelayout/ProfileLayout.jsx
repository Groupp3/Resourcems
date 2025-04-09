import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header/Header";
import UserProfileIcon from "../../components/UserProfileIcon/UserProfileIcon";
import Modal from "../../components/Modal/Modal";
import { FaUser, FaKey, FaSave, FaEdit, FaLock, FaEnvelope, FaUserTag } from "react-icons/fa";
import "./ProfileLayout.css";
import profileService from "../../services/ProfileService";
// import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

const ProfileLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await profileService.getCurrentUser();
      if (response && response.data) {
        setProfile({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          role: response.data.role || "",
          email: response.data.email || "",
          avatar: response.data.profileImageUrl || "",
        });
      }
    } catch (error) {
      toast.error("Failed to load profile information");
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!profile.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!profile.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      const userData = {
        firstName: profile.firstName,
        lastName: profile.lastName
      };
      
      const response = await profileService.updateProfile(userData);
      toast.success("Profile updated successfully!");
      setShowEditForm(false);
    } catch (error) {
      let errorMessage = "Failed to update profile";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePasswordForm()) return;
    
    try {
      setIsLoading(true);
      const passwordUpdateData = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      };
      
      const response = await profileService.changePassword(passwordUpdateData);
      toast.success("Password changed successfully!");
      setIsModalOpen(false);
      // Clear the password form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      let errorMessage = "Failed to change password";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm);
    // Reset errors when toggling form
    setErrors({});
  };

  // Reset password data when closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setErrors({});
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

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
                  <UserProfileIcon imageUrl={profile.avatar} />
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
                      disabled={isLoading}
                    >
                      <FaEdit className="me-2" />
                      {showEditForm ? "Cancel Editing" : "Edit Profile"}
                    </button>
                  </div>
                </div>

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
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        id="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        id="lastName"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
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
                      disabled={isLoading}
                    >
                      <FaKey className="me-2" />
                      Change Password
                    </button>
                    
                    <button 
                      type="button" 
                      className="btn btn-primary save-btn"
                      onClick={handleSaveChanges}
                      disabled={isLoading}
                    >
                      <FaSave className="me-2" />
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Change Password"
          primaryButtonText={isLoading ? "Saving..." : "Save Password"}
          onPrimaryClick={handleChangePassword}
          disabled={isLoading}
        >
          <div className="mb-3">
            <label htmlFor="currentPassword" className="form-label">Current Password</label>
            <input 
              type="password" 
              className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
            {errors.currentPassword && <div className="invalid-feedback">{errors.currentPassword}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>
            <input 
              type="password" 
              className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
            {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProfileLayout;