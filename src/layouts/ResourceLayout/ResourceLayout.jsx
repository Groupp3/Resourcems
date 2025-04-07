import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import UploadModal from "../../components/UploadModal/UploadModal";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header"; 
import "./ResourceLayout.css";

const sampleVideos = [
  {
    title: "Introduction to React",
    createdAt: "2025-04-06T10:00:00Z",
    isPublic: true,
    uploadedBy: "John Doe",
    thumbnailUrl: "https://via.placeholder.com/320x180.png?text=React",
  },
  {
    title: "Spring Boot Basics",
    createdAt: "2025-03-30T14:00:00Z",
    isPublic: false,
    uploadedBy: "Jane Smith",
    thumbnailUrl: "https://via.placeholder.com/320x180.png?text=Spring+Boot",
  },
];

const ResourceLayout = ({ children, onUploadSave }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const breadcrumbs = [
    { label: "Dashboard", url: "/dashboard" },
    { label: "Resources", url: "/resources" },
    { label: "Videos" },
  ];

  const handleUploadSaveInternal = (data) => {
    if (onUploadSave) {
      onUploadSave(data);
    }
    setShowModal(false);
  };

  return (
    <div className="resource-layout-container">
      <Header 
        backgroundColor="#FFFFFF" 
        textColor="#000000" 
        borderColor="#DDDDDD"
        profileSrc="https://via.placeholder.com/100"
        profileName="Admin"
        onLogout={handleLogout}
      />
            
      <Sidebar userRole="ADMIN" defaultOpen={true} logoText="EduVault" />
      <div className="content-area">
        <div className="breadcrumb-header">
          <Breadcrumb items={breadcrumbs} />
          <button className="upload-button" onClick={() => setShowModal(true)}>
            Upload +
          </button>
        </div>

        {/* Render the children passed to this layout */}
        {children}

        {showModal && (
          <UploadModal onClose={() => setShowModal(false)} onSave={handleUploadSaveInternal} />
        )}
      </div>
    </div>
  );
};

export default ResourceLayout;