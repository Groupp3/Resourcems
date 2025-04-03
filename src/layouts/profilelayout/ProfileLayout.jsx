import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header/Header";
import UserProfileIcon from "../../components/UserProfileIcon/UserProfileIcon";
import Modal from "../../components/Modal/Modal";
import { FaUser, FaKey, FaSave, FaEdit } from "react-icons/fa";
import "./ProfileLayout.css";

const ProfileLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    alert("Changes Saved!");
  };

  return (
    <div className="container-fluid">
      <Header />
      
      {/* Enhanced Profile Header Section with Avatar */}
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card profile-header-panel">
            <div className="pattern-overlay"></div>
            <div className="card-body">
              <div className="row align-items-center">
                {/* Left Side - Profile Avatar */}
                <div className="col-md-3 text-center">
                  
                    <UserProfileIcon
                    />
                  
                  <h5 className="mb-2">{profile.firstName} {profile.lastName}</h5>
                  <p className="text-muted small mb-3">{profile.email}</p>
                  <button 
                    className="btn btn-light profile-avatar-edit-btn"
                  >
                    <FaEdit className="me-2" />
                    Change Photo
                  </button>
                </div>
                
                {/* Right Side - Header Content */}
                <div className="col-md-9">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h2 className="mb-3 d-flex align-items-center">
                        <FaUser className="me-3" style={{ color: "#7e64ff", fontSize: "1.8rem" }} />
                        Profile Information
                      </h2>
                      <p className="mb-0">Manage your personal information and credentials</p>
                    </div>
                    <div className="d-none d-lg-block position-relative">
                      <div className="position-relative" style={{ width: "100px", height: "100px" }}>
                        <div style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          background: "rgba(126, 100, 255, 0.2)",
                          transform: "scale(1.2)",
                          zIndex: 0
                        }}></div>
                        <div style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          background: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 1
                        }}>
                          <FaUser style={{ color: "#7e64ff", fontSize: "2.5rem" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Content Section - Details Only */}
      <div className="row">
        <div className="col-12">
          <div className="card profile-details-card">
            <div className="card-body">
              <h4 className="card-title mb-4">Personal Details</h4>
              
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
                
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email"
                    value={profile.email} 
                    readOnly 
                  />
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
                    onClick={handleSaveChanges}
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

      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Change Password"
        primaryButtonText="Save Password"
        onPrimaryClick={() => alert("Password Changed!")}
      >
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">Current Password</label>
          <input type="password" className="form-control" id="currentPassword" />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">New Password</label>
          <input type="password" className="form-control" id="newPassword" />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" />
        </div>
      </Modal>
    </div>
  );
};

export default ProfileLayout;