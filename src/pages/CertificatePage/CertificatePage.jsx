import React, { useState, useEffect } from "react";
import ResourceLayout from "../../layouts/ResourceLayout/ResourceLayout";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import { FileText, Eye, Download, Trash2, Lock, Globe, X, ZoomIn, ZoomOut } from "lucide-react";
import styles from "./CertificatePage.module.css";
import { getResources, deleteResource ,uploadResource } from "../../services/ResourceService"; 
import { getUsersByRole } from "../../services/AdminService";
import axios from "axios";


const CertificatePage = () => {
  const [certificateData, setCertificateData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = useState(null);

  // Function to construct URL based on resource object
  const getImageUrl = (certificate) => {
    if (!certificate) return null;
    
    // Check if url or downloadUrl already exists
    if (certificate.url || certificate.downloadUrl) {
      return certificate.url || certificate.downloadUrl;
    }
    
    // Construct URL based on your API structure - using the correct endpoint
    const apiBaseUrl = "http://localhost:8080/api/resources";
    return `${apiBaseUrl}/${certificate.id}`;
  };

  const fetchAndSetCertificates = async (usersList = users) => {
    const refreshedData = await getResources();
    const imageResources = refreshedData.filter(item =>
      item.contentType && item.contentType.startsWith("image/")
    );

    const enhancedResources = imageResources.map(resource => {
      const user = usersList.find(user => user.id === resource.userId);
      return {
        ...resource,
        uploadedByName: user ? `${user.firstName} ${user.lastName}` : "Unknown User",
      };
    });

    setCertificateData(enhancedResources);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersData = await getUsersByRole();
        setUsers(usersData);
        await fetchAndSetCertificates(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch image data with authorization when the certificate is selected
  useEffect(() => {
    const fetchImage = async () => {
      if (!selectedCertificate) return;
      
      try {
        setImageLoaded(false);
        setImageError(false);
        setImageSrc(null);
        
        const imageUrl = getImageUrl(selectedCertificate);
        console.log("Fetching image from:", imageUrl);
        
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token missing");
        }
        
        // Fetch image with authentication
        const response = await axios.get(imageUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          responseType: 'blob'
        });
        
        // Create object URL from blob
        const objectUrl = URL.createObjectURL(response.data);
        setImageSrc(objectUrl);
        
      } catch (error) {
        console.error("Error fetching image:", error);
        setImageError(true);
      } finally {
        setImageLoaded(true);
      }
    };
    
    if (viewModalOpen && selectedCertificate) {
      fetchImage();
    }
    
    // Cleanup function to revoke object URL when component unmounts or certificate changes
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [selectedCertificate, viewModalOpen]);

  // Reset zoom when opening or closing modal
  useEffect(() => {
    setZoom(1);
    if (!viewModalOpen) {
      setSelectedCertificate(null);
    }
  }, [viewModalOpen]);

  const certificateColumns = [
    {
      key: "certificate",
      title: "Certificate",
      render: (item) => (
        <div className="document-info">
          <FileText className="document-icon" size={18} />
          <span className="document-name">{item.filename || item.title}</span>
        </div>
      ),
      width: "40%",
    },
    {
      key: "tags",
      title: "Tags",
      render: (item) => (
        <div className={styles.tagList}>
          {Array.isArray(item.tags) && item.tags.length > 0 ? (
            item.tags.map((tag, idx) => (
              <span key={idx} className={styles.tag}>
                {tag}
              </span>
            ))
          ) : (
            <span>No tags</span>
          )}
        </div>
      ),
      width: "30%",
    }
    ,
    
    {
      key: "uploadedBy",
      title: "Uploaded By",
      render: (item) => <span>{item.uploadedByName}</span>,
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

  const certificateActions = [
    { type: "view", icon: <Eye size={18} />, variant: "default" },
    { type: "download", icon: <Download size={18} />, variant: "primary" },
    { type: "delete", icon: <Trash2 size={18} />, variant: "danger" },
  ];

  const certificateBreadcrumbs = [
    { label: "Dashboard", url: "/dashboard" },
    { label: "Resources", url: "/resources" },
    { label: "Certificates" },
  ];

  const handleActionClick = async (actionType, item) => {
    console.log(`${actionType} clicked for`, item);
    
    // Implement action logic here based on the actionType
    switch(actionType) {
      case "view": 
        // View logic - open the modal and set the selected certificate
        setSelectedCertificate(item);
        setViewModalOpen(true);
        break;
      case "download":
        // Download logic
        handleDownload(item);
        break;
      case "delete":
        // Delete logic - open confirmation modal
        setSelectedCertificate(item);
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
      const downloadUrl = getImageUrl(item);
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
      link.setAttribute('download', item.filename || 'certificate');
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
    if (!selectedCertificate) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert('Authentication token missing. Please log in again.');
        return;
      }
      
      // Call the delete resource service
      await deleteResource(selectedCertificate.id);
      
      // Remove the deleted item from the local state
      setCertificateData(prevData => 
        prevData.filter(item => item.id !== selectedCertificate.id)
      );
      
      // Close the confirmation modal
      setDeleteModalOpen(false);
      setSelectedCertificate(null);
      
      // Show success message
      alert(`Certificate "${selectedCertificate.filename || selectedCertificate.title}" has been deleted.`);
      
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting certificate. Please try again.');
    }
  };

  const handleUploadSave = async (data) => {
    console.log("Certificate uploaded:", data);
    // Refresh the data after upload
    const refreshedData = await getResources();
    const imageResources = refreshedData.filter(item => 
      item.contentType && item.contentType.startsWith('image/')
    );
    
    // Re-enhance resources with user information
    const enhancedResources = imageResources.map(resource => {
      const user = users.find(user => user.id === resource.userId);
      return {
        ...resource,
        uploadedByName: user ? `${user.firstName} ${user.lastName}` : 'Unknown User'
      };
    });
    
    setCertificateData(enhancedResources);
  };

  // Close modal handler
  const handleCloseModal = () => {
    setViewModalOpen(false);
  };
  
  // Close delete modal handler
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedCertificate(null);
  };

  // Handle image load complete
  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  // Handle image load error
  const handleImageError = () => {
    console.error("Error displaying image");
    setImageError(true);
    setImageLoaded(true);
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
      breadcrumbItems={certificateBreadcrumbs}
      pageTitle="Certificates"
    >
      <div className={styles.resourceContent}>
        {loading ? (
          <div>Loading certificates...</div>
        ) : (
          <ListLayout
            type="certificate"
            data={certificateData}
            columns={certificateColumns}
            actions={certificateActions}
            onActionClick={handleActionClick}
            itemsPerPage={5}
            theme="purple"
          />
        )}
      </div>

      {/* Custom Certificate Viewer Modal */}
      {viewModalOpen && selectedCertificate && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{selectedCertificate.filename || selectedCertificate.title}</h3>
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
              {!imageLoaded && !imageError && (
                <div className={styles.loadingSpinner}>Loading certificate...</div>
              )}
              
              {imageError && (
                <div className={styles.errorMessage}>
                  Failed to load image. The file might be unavailable or you may not have permission to view it.
                </div>
              )}
              
              {imageLoaded && !imageError && imageSrc && (
                <div className={styles.imageContainer}>
                  <img 
                    src={imageSrc}
                    alt={selectedCertificate.filename || selectedCertificate.title}
                    className={styles.certificateImage}
                    onLoad={handleImageLoaded}
                    onError={handleImageError}
                    style={{ transform: `scale(${zoom})` }}
                  />
                </div>
              )}
            </div>
            <div className={styles.modalFooter}>
              <p>Uploaded by: {selectedCertificate.uploadedByName}</p>
              <div className={styles.actionButtons}>
                <button 
                  className={styles.downloadButton}
                  onClick={() => handleDownload(selectedCertificate)}
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
      {deleteModalOpen && selectedCertificate && (
        <div className={styles.modalOverlay}>
          <div className={styles.deleteModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.deleteModalHeader}>
              <h3>Confirm Delete</h3>
              <button className={styles.closeButton} onClick={handleCloseDeleteModal}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.deleteModalBody}>
              <p>Are you sure you want to delete the certificate:</p>
              <p className={styles.certificateName}>"{selectedCertificate.filename || selectedCertificate.title}"?</p>
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

export default CertificatePage;
