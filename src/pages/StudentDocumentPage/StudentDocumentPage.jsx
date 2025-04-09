import React, { useState, useEffect } from "react";
import StudentResourceLayout from "../../layouts/StudentResourceLayout/StudentResourceLayout";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import { FileText, Eye, Download, Trash2, Lock, Globe } from "lucide-react";
import styles from "./StudentDocumentPage.module.css";
import { getAccessibleResources, uploadResource } from "../../services/ResourceService";

const StudentDocumentPage = () => {
  const [documentData, setDocumentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // Options: "all", "private", "public"

  const fetchAndSetDocuments = async () => {
    try {
      console.log("Fetching documents...");
      
      // First get all accessible resources (this should include both private and public)
      const allResources = await getAccessibleResources();
      console.log("All resources:", allResources);
      
      // Filter for document type resources
      const documentResources = allResources.filter(resource => 
        resource.contentType && 
        (resource.contentType.startsWith("application/") || 
         resource.contentType === "application")
      );
      console.log("Document resources:", documentResources);
      
      // Split into public and private based on isPublic flag
      const publicDocs = documentResources.filter(doc => doc.isPublic === true);
      const privateDocs = documentResources.filter(doc => !doc.isPublic);
      
      console.log("Public docs:", publicDocs);
      console.log("Private docs:", privateDocs);
      
      // Filter based on active tab
      let filteredDocs;
      switch (activeTab) {
        case "private":
          filteredDocs = privateDocs;
          break;
        case "public":
          filteredDocs = publicDocs;
          break;
        case "all":
        default:
          filteredDocs = documentResources;
          break;
      }
      
      console.log("Filtered docs for tab:", activeTab, filteredDocs);
      setDocumentData(filteredDocs);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAndSetDocuments();
      setLoading(false);
    };

    fetchData();
  }, [activeTab]);

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
      width: "50%",
    },
{
        key: "tags",
        title: "Tags",
        render: (item) => (
          <div className={styles.tagList}>
            {Array.isArray(item.tagNames) && item.tagNames.length > 0 ? (
              item.tagNames.map((tag, id) => (
                <span key={id} className={styles.tag}>
                  {tag}
                </span>
              ))
            ) : (
              <span>No tags</span>
            )}
          </div>
        ),
        width: "30%",
      },
      
    {
      key: "access",
      title: "Access",
      render: (item) => (
        <div className="access-icon">
          {item.isPublic === true ? (
            <>
              <Globe size={18} /> 
              <span className={styles.accessLabel}>Public</span>
            </>
          ) : (
            <>
              <Lock size={18} />
              <span className={styles.accessLabel}>Private</span>
            </>
          )}
        </div>
      ),
      width: "20%",
    },
  ];

  const documentActions = [
    { type: "view", icon: <Eye size={18} />, variant: "default" },
    { type: "download", icon: <Download size={18} />, variant: "primary" },
    { 
      type: "delete", 
      icon: <Trash2 size={18} />, 
      variant: "danger",
      // Only show delete button for private documents
      condition: (item) => !item.isPublic
    },
  ];

  const documentBreadcrumbs = [
    { label: "Dashboard", url: "/dashboard" },
    { label: "Resources", url: "/resources" },
    { label: "Documents" },
  ];

  const handleActionClick = async (actionType, item) => {
    switch (actionType) {
      case "view":
        window.open(item.url, "_blank");
        break;
      case "download":
        const link = document.createElement("a");
        link.href = item.url;
        link.download = item.filename || "document";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case "delete":
        // Only allow deletion for non-public documents
        if (!item.isPublic) {
          console.log("Delete clicked:", item);
          // Implement delete logic here
          // After successful deletion:
          // await fetchAndSetDocuments();
        }
        break;
      default:
        break;
    }
  };

  const handleUploadSave = async ({ file, isPublic, tags }) => {
    try {
      console.log("Uploading document with:", { file, isPublic, tags });
      await uploadResource(file, isPublic, tags);
      await fetchAndSetDocuments();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <StudentResourceLayout
      onUploadSave={handleUploadSave}
      breadcrumbItems={documentBreadcrumbs}
      pageTitle="Documents"
    >
      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'all' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('all')}
        >
          All Documents
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'private' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('private')}
        >
          Private
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'public' ? styles.activeTab : ''}`}
          onClick={() => handleTabChange('public')}
        >
          Public
        </button>
      </div>
      
      <div className={styles.resourceContent}>
        {loading ? (
          <div>Loading documents...</div>
        ) : documentData.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText size={48} />
            <h3>No documents found</h3>
            <p>
              {activeTab === 'all' 
                ? "There are no documents available." 
                : activeTab === 'private' 
                  ? "You don't have access to any private documents." 
                  : "There are no public documents available."}
            </p>
          </div>
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
    </StudentResourceLayout>
  );
};

export default StudentDocumentPage;