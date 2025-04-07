import React from "react";
import "./ResourcePage.css";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import ResourceCard from "../../components/ResourceCard/ResourceCard";
import FileList from "../../components/FileList/FileList";

import {
  VideoIcon,
  FileTextIcon,
  BadgeCheckIcon,
} from "lucide-react";


const ResourcePage = () => {
  // Storage data with appropriate icons for each title
  const storageItems = [
    {
      title: "Videos",
      used: 24,
      total: 50,
      icon: <VideoIcon size={24} />, // Suitable for videos
      color: "#9747FF"
    },
    {
      title: "Documents",
      used: 10,
      total: 50,
      icon: <FileTextIcon size={24} />, // Better for documents
      color: "#FF9900"
    },
    {
      title: "Certificates",
      used: 16,
      total: 50,
      icon: <BadgeCheckIcon size={24} />, // Certificate-like appearance
      color: "#FF00FF"
    }
  ];


  // Recent files data
  const recentFiles = [
    { name: "Wiz Khalifa - See You Again", extension: "MP3", size: "5.265 KB" },
    { name: "honest.psd", extension: "PDF", size: "825 KB" },
    { name: "Screenshot2023.png", extension: "PNG", size: "121 KB" }
  ];

  // Format files for the FileList component
  const formattedFiles = recentFiles.map(file => ({
    name: file.name,
    size: file.size,
    type: file.extension.toLowerCase()
  }));

  return (
    <AdminLayout>
    <div className="adminlayout">
      <div className="resource-page">
        <section className="storage-section">
        
          <div className="storage-cards">
            {storageItems.map((item, index) => (
              <div key={index} className="storage-card-wrapper">
                <ResourceCard 
                  title={item.title} 
                  color={item.color}
                  usedStorage={`${item.used} GB of ${item.total} GB used`}
                  percentage={item.used / item.total * 100}
                />
              </div>
            ))}
          </div>
        </section>

        <div className="content-wrapper">
          <section className="files-section">
            <div className="files-header">
              <h2 className="section-title">New Files</h2>
              <button className="view-all-btn">VIEW ALL</button>
            </div>
            
            <FileList files={formattedFiles} />
          </section>
         
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default ResourcePage;