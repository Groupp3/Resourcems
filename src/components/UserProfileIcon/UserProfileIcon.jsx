import React, { useState, useRef } from "react";
import "./UserProfileIcon.css";
import { uploadProfilePicture } from "../../services/AdminService";

const UserProfileIcon = ({ 
  avatar = "/api/placeholder/200/200", 
  name = "John Doe",
  size = 100,
  onProfileUpdate = () => {},
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const iconStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #ddd",
    position: "relative", // Important for overlay
  };

  const addButtonStyle = {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    width: `${size * 0.35}px`,
    height: `${size * 0.35}px`,
    fontSize: `${size * 0.2}px`,
    backgroundColor: isUploading ? "#ccc" : "#007bff",
    color: "white",
    border: "none",
    borderRadius: "50%",
    cursor: isUploading ? "not-allowed" : "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // Reset previous error states
    setUploadError(null);

    // File type validation
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setUploadError("Please select a valid image file (JPEG, PNG, or GIF)");
      return;
    }

    // Size validation (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      setUploadError("File size must be less than 5MB");
      return;
    }

    try {
      // Show preview immediately for better UX
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      
      // Set uploading state
      setIsUploading(true);
      
      console.log("Starting profile picture upload:", file.name);
      
      // Upload the file
      const imageUrl = await uploadProfilePicture(file);
      console.log("Upload complete, received URL:", imageUrl);
      
      // Update parent component with new image URL
      if (imageUrl) {
        onProfileUpdate(imageUrl);
        console.log("Profile updated with new image URL");
      } else {
        setUploadError("Server returned an invalid response. Please try again.");
        setPreviewImage(null);
      }
    } catch (error) {
      console.error("Profile picture upload failed:", error);
      setUploadError("Upload failed. Please try again later.");
      setPreviewImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="profile-icon-container" style={{ position: "relative" }}>
      <div className="profile-icon-wrapper" style={iconStyle}>
        <img
          src={previewImage || avatar || "/api/placeholder/200/200"}
          alt={`${name}'s profile`}
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover", 
            borderRadius: "50%",
            opacity: isUploading ? 0.6 : 1,
            transition: "opacity 0.3s"
          }}
        />
        
        {isUploading && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255,255,255,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            zIndex: 1
          }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Uploading...</span>
            </div>
          </div>
        )}
      </div>
      
      <button 
        className="add-profile-button" 
       
        onClick={() => !isUploading && fileInputRef.current.click()}
        disabled={isUploading}
        title="Change profile picture"
      >
        {isUploading ? "..." : "+"}
      </button>
      
      <input 
        type="file" 
        ref={fileInputRef}
        style={{ display: "none" }} 
        accept="image/jpeg,image/png,image/gif" 
        onChange={handleFileChange} 
      />
      
      {uploadError && (
        <div className="text-danger mt-2" style={{ fontSize: "0.8rem", maxWidth: `${size * 3}px` }}>
          {uploadError}
        </div>
      )}
    </div>
  );
};

export default UserProfileIcon;