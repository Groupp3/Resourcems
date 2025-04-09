import React, { useEffect, useState } from "react";
import "./ResourcePage.css";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import ResourceCard from "../../components/ResourceCard/ResourceCard";
import FileList from "../../components/FileList/FileList";
import { getResources, uploadResource } from "../../services/ResourceService";
import { useNavigate } from "react-router-dom";
import { VideoIcon, FileTextIcon, BadgeCheckIcon, Upload } from "lucide-react";
import UploadModal from "../../components/UploadModal/UploadModal";
// import axios from "axios";

const iconMap = {
  video: <VideoIcon size={24} />,
  document: <FileTextIcon size={24} />,
  certificate: <BadgeCheckIcon size={24} />,
};

const colorMap = {
  video: "#9747FF",
  document: "#FF9900",
  certificate: "#FF00FF",
};

const getType = (contentType) => {
  if (contentType.startsWith("video/")) return "video";
  if (contentType.startsWith("application/")) return "document";
  if (contentType.startsWith("image/")) return "certificate";
  return "document";
};

const ResourcePage = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fetchAndSetResources = async () => {
    try {
      const data = await getResources();
      setResources(data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  useEffect(() => {
    fetchAndSetResources();
  }, []);

  const groupedResources = resources.reduce((acc, res) => {
    const type = getType(res.contentType);
    if (!acc[type]) acc[type] = [];
    acc[type].push(res);
    return acc;
  }, {});

  const storageItems = Object.keys(groupedResources).map((type) => ({
    title: type.charAt(0).toUpperCase() + type.slice(1) + "s",
    noFiles: groupedResources[type].length,
    icon: iconMap[type] || <FileTextIcon size={24} />,
    color: colorMap[type] || "#ccc",
  }));

  const files = resources
    .slice()
    .sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt)) // sort descending
    .slice(0, 4)
    .map((res) => ({
      name: res.title,
      type: getType(res.contentType),
      fileSize: res.fileSize,
      access: res.isPublic ? "Public" : "Private",
      modifiedAt: res.modifiedAt,
    }));

  // Handle breadcrumb navigation
  const handleBreadcrumbClick = (path) => {
    if (path === "resource") {
      navigate("/admin/resource");
    } else if (path === "dashboard") {
      navigate("/admin");
    }
  };

  
  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

 
  const handleUploadModalClose = () => {
    setIsUploadModalOpen(false);
  };

 
  const handleUploadSave = async ({ file, isPublic, tags }) => {
    try {
      setIsUploading(true);
      console.log("Uploading resource with:", { file, isPublic, tags });
      
   
      console.log("File object:", file);
      console.log("File name:", file?.name);
      console.log("File type:", file?.type);
      
      if (!file || !(file instanceof File)) {
        throw new Error("Invalid file object");
      }
      
      const formData = new FormData();
      formData.append("file", file); 
      formData.append("visibility", isPublic ? "true" : "false");
      
      if (tags && tags.length > 0) {
        formData.append("tags", JSON.stringify(tags));
      }
      
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token missing. Please log in again.");
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      
      
      const response = await uploadResource(formData);
      
   
      
      console.log("Upload response:", response);
      
      await fetchAndSetResources();
      setIsUploadModalOpen(false);
      alert(`Resource "${file.name}" has been uploaded successfully.`);
    } catch (error) {
      // Error handling remains the same...
    }
  }

  return (
    <AdminLayout onBreadcrumbClick={handleBreadcrumbClick}>
      <div className="adminlayout">
        <div className="content-container">
            <div className="up-btn">
                <button 
                    className="upload-button" 
                    onClick={handleUploadClick}
                    disabled={isUploading}
                >
                    <Upload size={16} />
                    <span>{isUploading ? "Uploading..." : "Upload"}</span>
                </button>
                </div>
          <section className="storage-section">

          
            <div className="storage-header">
              <h2 className="section-title">Storage</h2>
             
            </div>
            
            <div className="storage-cards">
              {storageItems.map((item, index) => (
                <div
                  key={index}
                  className="storage-card-wrapper"
                  onClick={() => {
                    const lower = item.title.toLowerCase();
                    if (lower === "certificates") {
                      navigate("/admin/resource/certificates");
                    } else if (lower === "documents") {
                      navigate("/admin/resource/documents");
                    } else if (lower === "videos") {
                      navigate("/admin/resource/videos");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <ResourceCard
                    title={item.title}
                    noFiles={item.noFiles}
                    color={item.color}
                    icon={item.icon}
                  />
                </div>
              ))}
            </div>
          </section>
          <section className="files-section">
            <div className="files-header">
              <h2 className="section-title">New Files</h2>
            </div>
            <div className="file-list-container-wrapper">
              <FileList files={files} />
            </div>
          </section>
        </div>
      </div>
      
      {isUploadModalOpen && (
        <UploadModal
          onClose={handleUploadModalClose}
          onSave={handleUploadSave}
          isUploading={isUploading}
        />
      )}
    </AdminLayout>
  );
};

export default ResourcePage;