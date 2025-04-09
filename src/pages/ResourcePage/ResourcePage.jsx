import React, { useEffect, useState } from "react";
import "./ResourcePage.css";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import ResourceCard from "../../components/ResourceCard/ResourceCard";
import FileList from "../../components/FileList/FileList";
import { getResources } from "../../services/ResourceService";

import {
  VideoIcon,
  FileTextIcon,
  BadgeCheckIcon,
  FileIcon
} from "lucide-react";

const iconMap = {
  video: <VideoIcon size={24} />,
  document: <FileTextIcon size={24} />,
  certificate: <BadgeCheckIcon size={24} />,
  other: <FileIcon size={24} />
};

const colorMap = {
  video: "#9747FF",
  document: "#FF9900",
  certificate: "#FF00FF",
  other: "#64748B"
};

const getType = (contentType) => {
  if (contentType.startsWith("video/")) return "video";
  if (contentType.startsWith("application/")) return "document";
  if (contentType.startsWith("image/")) return "certificate";
  return "other";
};

const ResourcePage = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getResources();
        setResources(data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
    icon: iconMap[type] || iconMap.other,
    color: colorMap[type] || colorMap.other,
    type: type
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

  return (
    <AdminLayout>
      <div className="adminlayout">
        <div className="resource-page">
          <div className="content-container">
            <section className="storage-section">
              <div className={`storage-cards ${isLoading ? 'is-loading' : ''}`}>
                {storageItems.map((item, index) => (
                  <div key={index} className="storage-card-wrapper">
                    <ResourceCard 
                      title={item.title} 
                      noFiles={item.noFiles}
                      color={item.color}
                      icon={item.icon}
                      type={item.type}
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
                <FileList 
                  files={files} 
                  isLoading={isLoading} 
                  iconMap={iconMap} 
                  colorMap={colorMap}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ResourcePage;