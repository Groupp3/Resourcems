import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../components/header/Header";
import UserProfileIcon from "../../components/UserProfileIcon/UserProfileIcon";
import Modal from "../../components/Modal/Modal";
import { FaUser, FaKey, FaSave, FaEdit } from "react-icons/fa";
import "./ProfileLayout.css";

const API_URL = "http://localhost:8080/api/users"; // Base User URL

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
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found.");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`${API_URL}/profile`, config);
      const userData = response.data.response; 

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
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found.");
        return;
      }

      const updateDTO = {
        firstName: profile.firstName,
        lastName: profile.lastName,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.put(`${API_URL}/profile`, updateDTO, config);
      console.log("Profile updated successfully:", response.data);
      setShowEditForm(false);
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
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

      <div className="row">
        <div className="col-12 mb-4">
          <div className="card profile-header-panel">
            <div className="pattern-overlay"></div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3 text-center">
                  <UserProfileIcon avatar={profile.avatar} />
                  <h5 className="mb-2">{profile.firstName} {profile.lastName}</h5>
                  <p className="text-muted small mb-3">{profile.email}</p>
                  
                </div>

                <div className="col-md-6">
                  <div className="user-profile-info">
                    <h3 className="mb-2">{profile.firstName} {profile.lastName}</h3>
                    <p className="role-badge">{profile.role}</p>
                    <p className="mb-1 text-muted">{profile.email}</p>
                    <button
                      className="btn btn-outline-primary edit-profile-btn"
                      onClick={toggleEditForm}
                    >
                      <FaEdit className="me-2" />
                      {showEditForm ? "Cancel Editing" : "Edit Profile"}
                    </button>
                  </div>
                </div>

                <div className="col-md-3 d-flex justify-content-center justify-content-md-end"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                    <label htmlFor="role" className="form-label">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      id="role"
                      name="role"
                      value={profile.role}
                      readOnly
                    />
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Change Password"
        primaryButtonText="Save Password"
        onPrimaryClick={() => alert("Password change API will be added")}
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
          />
        </div>
      </Modal>
    </div>
  );
};

export default ProfileLayout;
