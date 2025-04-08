import React, { useState, useEffect } from "react";
import ResourceLayout from "../../layouts/ResourceLayout/ResourceLayout";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import { FileText, Eye, Download, Trash2, Lock, Globe } from "lucide-react";
import styles from "./DocumentPage.module.css";
import { getResources } from "../../services/ResourceService"; 
import { getUsersByRole } from "../../services/AdminService"; 

const DocumentPage = () => {
  const [documentData, setDocumentData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // First fetch all users
        const usersData = await getUsersByRole();
        setUsers(usersData);
        
        // Then fetch all resources and filter for application types
        const resourcesData = await getResources();
        const applicationResources = resourcesData.filter(item => 
          item.contentType && item.contentType.startsWith('application/')
        );
        
        // Enhance resources with user information
        const enhancedResources = applicationResources.map(resource => {
          const user = usersData.find(user => user.id === resource.userId);
          return {
            ...resource,
            uploadedByName: user ? `${user.firstName} ${user.lastName}` : 'Unknown User'
          };
        });
        
        setDocumentData(enhancedResources);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const documentColumns = [
    {
      key: "document",
      title: "Document",
      render: (item) => (
        <div className="document-info">
          <FileText className="document-icon" size={18} />
          <span className="document-name">{item.filename || item.title}</span>
        </div>
      ),
      width: "40%",
    },
    {
      key: "uploadedBy",
      title: "Uploaded By",
      render: (item) => (
        <span>{item.uploadedByName}</span>
      ),
      width: "30%",
    },
    {
      key: "access",
      title: "Access",
      render: (item) => (
        <div className="access-icon">
          {item.isPublic === true ? <Globe size={18} /> : <Lock size={18} />}
        </div>
      ),
      width: "20%",
    },
  ];

  const documentActions = [
    { type: "view", icon: <Eye size={18} />, variant: "default" },
    { type: "download", icon: <Download size={18} />, variant: "primary" },
    { type: "delete", icon: <Trash2 size={18} />, variant: "danger" },
  ];

  const documentBreadcrumbs = [
    { label: "Dashboard", url: "/dashboard" },
    { label: "Resources", url: "/resources" },
    { label: "Documents" }
  ];

  const handleActionClick = async (actionType, item) => {
    console.log(`${actionType} clicked for`, item);
    
    // Implement action logic here based on the actionType
    switch(actionType) {
      case "view":
        // View logic
        break;
      case "download":
        // Download logic
        break;
      case "delete":
        // Delete logic and refresh data
        break;
      default:
        break;
    }
  };

  const handleUploadSave = async (data) => {
    console.log("Document uploaded:", data);
    // Refresh the data after upload
    const refreshedData = await getResources();
    const applicationResources = refreshedData.filter(item => 
      item.contentType && item.contentType.startsWith('application/')
    );
    
    // Re-enhance resources with user information
    const enhancedResources = applicationResources.map(resource => {
      const user = users.find(user => user.id === resource.userId);
      return {
        ...resource,
        uploadedByName: user ? `${user.firstName} ${user.lastName}` : 'Unknown User'
      };
    });
    
    setDocumentData(enhancedResources);
  };

  return (
    <ResourceLayout 
      onUploadSave={handleUploadSave}
      breadcrumbItems={documentBreadcrumbs}
      pageTitle="Documents"
    >
      <div className={styles.resourceContent}>
        {loading ? (
          <div>Loading documents...</div>
        ) : (
          <ListLayout
            type="document"
            data={documentData}
            columns={documentColumns}
            actions={documentActions}
            onActionClick={handleActionClick}
            itemsPerPage={5}
            theme="purple"
          />
        )}
      </div>
    </ResourceLayout>
  );
};

export default DocumentPage;