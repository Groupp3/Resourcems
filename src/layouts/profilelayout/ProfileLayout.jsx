// ProfileLayout.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header/Header";
import UserProfileIcon from "../../components/UserProfileIcon/UserProfileIcon";
import Modal from "../../components/Modal/Modal";
import { FaUser, FaKey, FaSave } from "react-icons/fa";
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
    <div className="container-fluid p-3 bg-white">
      <Header />
      
      {/* Profile Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title">
                <FaUser className="me-2" />
                Profile Information
              </h2>
              <p className="card-text text-muted">Manage your personal information and credentials</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Content Section */}
      <div className="row">
        {/* Left Side - Profile Picture */}
        <div className="col-12 col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center">
              <div className="mb-3">
                <UserProfileIcon 
                  src={profile.avatar} 
                  name={`${profile.firstName} ${profile.lastName}`} 
                  size="lg" 
                />
              </div>
              <button className="btn btn-primary mb-4">
                <FaUser className="me-2" />
                Edit Photo
              </button>
              
              <h5 className="card-title">Photo Gallery</h5>
              <div className="row g-2 mt-3">
                <div className="col-4">
                  <div className="card">
                    <img src="https://via.placeholder.com/100" className="card-img-top" alt="Placeholder" />
                    <div className="card-body p-2">
                      <p className="card-text small">Photo 1</p>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <img src="https://via.placeholder.com/100" className="card-img-top" alt="Placeholder" />
                    <div className="card-body p-2">
                      <p className="card-text small">Photo 2</p>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <img src="https://via.placeholder.com/100" className="card-img-top" alt="Placeholder" />
                    <div className="card-body p-2">
                      <p className="card-text small">Photo 3</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Profile Details */}
        <div className="col-12 col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title mb-4">Personal Details</h4>
              
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
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
                
                <div className="d-flex justify-content-between mt-4">
                  <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FaKey className="me-2" />
                    Change Password
                  </button>
                  
                  <button 
                    type="button" 
                    className="btn btn-success"
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

      {/* Change Password Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Change Password"
        primaryButtonText="Save Password"
        onPrimaryClick={() => alert("Password Changed!")}
      >
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