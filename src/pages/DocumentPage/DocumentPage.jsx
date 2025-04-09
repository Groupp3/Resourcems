import React, { useState, useEffect } from "react";
import ResourceLayout from "../../layouts/ResourceLayout/ResourceLayout";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import { FileText, Eye, Download, Trash2, Lock, Globe, X, ZoomIn, ZoomOut } from "lucide-react";
import styles from "./DocumentPage.module.css";
import { getResources, deleteResource } from "../../services/ResourceService"; 
import { getUsersByRole } from "../../services/AdminService";
import axios from "axios";

const DocumentPage = () => {
  const [documentData, setDocumentData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const [documentError, setDocumentError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [documentSrc, setDocumentSrc] = useState(null);

  // Function to construct URL based on resource object
  const getDocumentUrl = (document) => {
    if (!document) return null;
    
    // Check if url or downloadUrl already exists
    if (document.url || document.downloadUrl) {
      return document.url || document.downloadUrl;
    }
    
    // Construct URL based on your API structure - using the correct endpoint
    const apiBaseUrl = "http://localhost:8080/api/resources";
    return `${apiBaseUrl}/${document.id}`;
  };

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

  // Fetch document data with authorization when the document is selected
  useEffect(() => {
    const fetchDocument = async () => {
      if (!selectedDocument) return;
      
      try {
        setDocumentLoaded(false);
        setDocumentError(false);
        setDocumentSrc(null);
        
        const documentUrl = getDocumentUrl(selectedDocument);
        console.log("Fetching document from:", documentUrl);
        
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token missing");
        }
        
        // Fetch document with authentication
        const response = await axios.get(documentUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          responseType: 'blob'
        });
        
        // Create object URL from blob
        const objectUrl = URL.createObjectURL(response.data);
        setDocumentSrc(objectUrl);
        
      } catch (error) {
        console.error("Error fetching document:", error);
        setDocumentError(true);
      } finally {
        setDocumentLoaded(true);
      }
    };
    
    if (viewModalOpen && selectedDocument) {
      fetchDocument();
    }
    
    // Cleanup function to revoke object URL when component unmounts or document changes
    return () => {
      if (documentSrc) {
        URL.revokeObjectURL(documentSrc);
      }
    };
  }, [selectedDocument, viewModalOpen]);

  // Reset zoom when opening or closing modal
  useEffect(() => {
    setZoom(1);
    if (!viewModalOpen) {
      setSelectedDocument(null);
    }
  }, [viewModalOpen]);

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
        // View logic - open the modal and set the selected document
        setSelectedDocument(item);
        setViewModalOpen(true);
        break;
      case "download":
        // Download logic
        handleDownload(item);
        break;
      case "delete":
        // Delete logic - open confirmation modal
        setSelectedDocument(item);
        setDeleteModalOpen(true);
        break;
      default:
        break;
    }
  };

  const handleDownload = async (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert('Authentication token missing. Please log in again.');
      return;
    }
    
    try {
      const downloadUrl = getDocumentUrl(item);
      const response = await axios.get(downloadUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', item.filename || 'document');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading file.');
    }
  };
  
  const handleDeleteConfirm = async () => {
    if (!selectedDocument) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert('Authentication token missing. Please log in again.');
        return;
      }
      
      // Call the delete resource service
      await deleteResource(selectedDocument.id);
      
      // Remove the deleted item from the local state
      setDocumentData(prevData => 
        prevData.filter(item => item.id !== selectedDocument.id)
      );
      
      // Close the confirmation modal
      setDeleteModalOpen(false);
      setSelectedDocument(null);
      
      // Show success message
      alert(`Document "${selectedDocument.filename || selectedDocument.title}" has been deleted.`);
      
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting document. Please try again.');
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

  // Close modal handler
  const handleCloseModal = () => {
    setViewModalOpen(false);
  };
  
  // Close delete modal handler
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDocument(null);
  };

  // Handle document load complete
  const handleDocumentLoaded = () => {
    setDocumentLoaded(true);
  };

  // Handle document load error
  const handleDocumentError = () => {
    console.error("Error displaying document");
    setDocumentError(true);
    setDocumentLoaded(true);
  };

  // Zoom in handler
  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  // Zoom out handler
  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
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

      {/* Custom Document Viewer Modal */}
      {viewModalOpen && selectedDocument && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{selectedDocument.filename || selectedDocument.title}</h3>
              <div className={styles.modalControls}>
                <button className={styles.zoomButton} onClick={zoomOut} title="Zoom Out">
                  <ZoomOut size={18} />
                </button>
                <span className={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
                <button className={styles.zoomButton} onClick={zoomIn} title="Zoom In">
                  <ZoomIn size={18} />
                </button>
                <button className={styles.closeButton} onClick={handleCloseModal} title="Close">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div 
              className={styles.modalBody}
              style={{ cursor: zoom > 1 ? 'move' : 'default' }}
            >
              {!documentLoaded && !documentError && (
                <div className={styles.loadingSpinner}>Loading document...</div>
              )}
              
              {documentError && (
                <div className={styles.errorMessage}>
                  Failed to load document. The file might be unavailable or you may not have permission to view it.
                </div>
              )}
              
              {documentLoaded && !documentError && documentSrc && (
                <div className={styles.documentContainer}>
                  <iframe 
                    src={documentSrc}
                    title={selectedDocument.filename || selectedDocument.title}
                    className={styles.documentFrame}
                    onLoad={handleDocumentLoaded}
                    onError={handleDocumentError}
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}
                  />
                </div>
              )}
            </div>
            <div className={styles.modalFooter}>
              <p>Uploaded by: {selectedDocument.uploadedByName}</p>
              <div className={styles.actionButtons}>
                <button 
                  className={styles.downloadButton}
                  onClick={() => handleDownload(selectedDocument)}
                >
                  <Download size={16} /> Download
                </button>
                <button 
                  className={styles.deleteButton}
                  onClick={() => {
                    handleCloseModal();
                    setDeleteModalOpen(true);
                  }}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && selectedDocument && (
        <div className={styles.modalOverlay}>
          <div className={styles.deleteModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.deleteModalHeader}>
              <h3>Confirm Delete</h3>
              <button className={styles.closeButton} onClick={handleCloseDeleteModal}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.deleteModalBody}>
              <p>Are you sure you want to delete the document:</p>
              <p className={styles.documentName}>"{selectedDocument.filename || selectedDocument.title}"?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div className={styles.deleteModalFooter}>
              <button 
                className={styles.cancelButton}
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </button>
              <button 
                className={styles.confirmDeleteButton}
                onClick={handleDeleteConfirm}
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </ResourceLayout>
  );
};

export default DocumentPage;