import React, { useState, useEffect } from "react";
import StudentResourceLayout from "../../layouts/StudentResourceLayout/StudentResourceLayout";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import { FileText, Eye, Download, Trash2, Lock, Globe, X, ZoomIn, ZoomOut, Share2, ChevronDown, Printer } from "lucide-react";
import { getAccessibleResources, uploadResource, deleteResource } from "../../services/ResourceService";
import styles from "./StudentCertificatePage.module.css";
import Modal from "../../components/Modal/Modal";
import axios from "axios";

const StudentCertificatePage = () => {
  const [certificateData, setCertificateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = useState(null);
  
  // Modal states
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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

  const fetchAndSetCertificates = async () => {
    try {
      const publicResources = await getAccessibleResources("image/");
      const privateResources = await getAccessibleResources();

      // Merge resources and avoid duplicates (based on id)
      const mergedResources = [
        ...privateResources,
        ...publicResources.filter(
          (pubItem) =>
            !privateResources.some((privItem) => privItem.id === pubItem.id)
        ),
      ];

      setCertificateData(mergedResources);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAndSetCertificates();
      setLoading(false);
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
    setSelectedCertificate(item);
    
    // Handle different actions
    switch(actionType) {
      case "view": 
        setViewModalOpen(true);
        break;
      case "download":
        handleDownload(item);
        break;
      case "delete":
        setActionType("delete");
        setIsConfirmModalOpen(true);
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
      
      // Show success message
      setSuccessMessage(`Certificate "${item.filename || 'certificate'}" downloaded successfully`);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading file.');
    }
  };
  
  const handleConfirmAction = async () => {
    try {
      if (actionType === "delete") {
        await handleDeleteConfirm();
      }
    } catch (error) {
      console.error(`Error during ${actionType} action:`, error);
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
      
      // Show success message
      setSuccessMessage(`Certificate "${selectedCertificate.filename || selectedCertificate.title}" has been deleted.`);
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
      setSelectedCertificate(null);
      
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting certificate. Please try again.');
    }
  };

  const handleUploadSave = async ({ file, isPublic, tags }) => {
    try {
      console.log("Uploading certificate with:", { file, isPublic, tags });
      await uploadResource(file, isPublic, tags);
      await fetchAndSetCertificates();
      
      // Show success message
      setSuccessMessage(`Certificate uploaded successfully.`);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Close modal handler
  const handleCloseModal = () => {
    setViewModalOpen(false);
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
    <StudentResourceLayout
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
              <div className={styles.actionButtons}>
                <button 
                  className={styles.downloadButton}
                  onClick={() => handleDownload(selectedCertificate)}
                >
                  <Download size={16} /> Download
                </button>
                <button 
                  className={styles.printButton}
                  onClick={() => window.print()}
                >
                  <Printer size={16} /> Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Deletion"
        type="confirm"
        confirmAction={handleConfirmAction}
        confirmText="Delete"
      >
        <p>Are you sure you want to delete the certificate:</p>
        <p className={styles.certificateName}>"{selectedCertificate?.filename || selectedCertificate?.title}"?</p>
        <p>This action cannot be undone.</p>
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Success"
        type="success"
      >
        <p>{successMessage}</p>
      </Modal>
    </StudentResourceLayout>
  );
};

export default StudentCertificatePage;