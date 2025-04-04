import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header/Header";
import UserProfileIcon from "../../components/UserProfileIcon/UserProfileIcon";
import Modal from "../../components/Modal/Modal";
import { FaUser, FaKey, FaSave, FaEdit } from "react-icons/fa";
import "./ProfileLayout.css";

const API_URL = "http://localhost:8080/users/profile"; // Adjust API URL

const ProfileLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found.");
        return;
      }

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const userData = response.data.response; // Adjust according to API response

      setProfile({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        avatar: userData.avatar || "https://reqres.in/img/faces/1-image.jpg",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(API_URL, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert("Changes Saved!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card profile-header-panel">
            <div className="pattern-overlay"></div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3 text-center">
                  <UserProfileIcon avatar={profile.avatar} />
                  <h5 className="mb-2">
                    {profile.firstName} {profile.lastName}
                  </h5>
                  <p className="text-muted small mb-3">{profile.email}</p>
                  <button className="btn btn-light profile-avatar-edit-btn">
                    <FaEdit className="me-2" />
                    Change Photo
                  </button>
                </div>
                <div className="col-md-9">
                  <h2 className="mb-3 d-flex align-items-center">
                    <FaUser className="me-3" style={{ color: "#7e64ff", fontSize: "1.8rem" }} />
                    Profile Information
                  </h2>
                  <p className="mb-0">Manage your personal information and credentials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="row">
        <div className="col-12">
          <div className="card profile-details-card">
            <div className="card-body">
              <h4 className="card-title mb-4">Personal Details</h4>
              <form>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={profile.firstName} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={profile.lastName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={profile.email} readOnly />
                  <div className="form-text text-muted">Your email cannot be changed</div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button type="button" className="btn btn-outline-primary" onClick={() => setIsModalOpen(true)}>
                    <FaKey className="me-2" />
                    Change Password
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Change Password" primaryButtonText="Save Password" onPrimaryClick={() => alert("Password Changed!")}>
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
