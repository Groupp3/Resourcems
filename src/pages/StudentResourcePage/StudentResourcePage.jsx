import React, { useEffect, useState } from "react";
import "./StudentResourcePage.css";
import StudentLayout from "../../layouts/Studentlayout/StudentLayout";
import ResourceCard from "../../components/ResourceCard/ResourceCard";
import FileList from "../../components/FileList/FileList";
import { getAccessibleResources, uploadResource } from "../../services/ResourceService";
import { useNavigate } from "react-router-dom";
import { VideoIcon, FileTextIcon, BadgeCheckIcon, Upload } from "lucide-react";
import UploadModal from "../../components/UploadModal/UploadModal";

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
  return "other";
};

const StudentResourcePage = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchAndSetResources = async () => {
    try {
      const data = await getAccessibleResources();
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
    .sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt))
    .slice(0, 4)
    .map((res) => ({
      name: res.title,
      type: getType(res.contentType),
      fileSize: res.fileSize,
      access: res.isPublic ? "Public" : "Private",
      modifiedAt: res.modifiedAt,
    }));

  const handleBreadcrumbClick = (path) => {
    if (path === "resource") {
      navigate("/student/resource");
    } else if (path === "dashboard") {
      navigate("/student");
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
      console.log("Uploading resource with:", { file, isPublic, tags });
      await uploadResource(file, isPublic, tags);
      await fetchAndSetResources();
      setIsUploadModalOpen(false);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <StudentLayout onBreadcrumbClick={handleBreadcrumbClick}>
      <div className="adminlayout">
        <div className="resource-page">
          <div className="content-container">
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
                        navigate("/student/resource/certificates");
                      } else if (lower === "documents") {
                        navigate("/student/resource/documents");
                      } else if (lower === "videos") {
                        navigate("/student/resource/videos");
                      }else if (lower === "others"){
                        navigate("/student/resource/others");

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
      </div>

      {isUploadModalOpen && (
        <UploadModal onClose={handleUploadModalClose} onSave={handleUploadSave} />
      )}
    </StudentLayout>
  );
};

export default StudentResourcePage;
