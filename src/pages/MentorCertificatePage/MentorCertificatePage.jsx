import React, { useState, useEffect } from "react";
import MentorResourceLayout from "../../layouts/MentorResourceLayout/MentorResourceLayout";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import { FileText, Eye, Download, Trash2, Lock, Globe, X, ZoomIn, ZoomOut, Share2, ChevronDown, Printer } from "lucide-react";
import {
  getAccessibleResources,
  uploadResource,
  deleteResource,
  shareResource
} from "../../services/ResourceService";
import { getUsersByRole } from "../../services/AdminService";
import styles from "./MentorCertificatePage.module.css";
import Modal from "../../components/Modal/Modal";
import axios from "axios";

// Define the base URL for certificates similar to the first implementation
const BASE_CERTIFICATE_URL = "https://resourcebucket-1111.s3.amazonaws.com/";

const MentorCertificatePage = () => {
  const [certificateData, setCertificateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = useState(null);
  const [students, setStudents] = useState([]);
  const [sharingInProgress, setSharingInProgress] = useState(false);

  // Modal states
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const normalizeTags = (resources) =>
    resources.map((res) => ({
      ...res,
      tags:
        res.tags?.map((tag) =>
          typeof tag === "string" ? { name: tag } : tag
        ) || [],
    }));

  // Modified to use the same approach as the first implementation
  const getImageUrl = (certificate) => {
    if (!certificate) return null;
    
    // If direct S3 URL is available in the object
    if (certificate.url || certificate.downloadUrl) {
      return certificate.url || certificate.downloadUrl;
    }
    
    // Use S3 bucket with object key (same pattern as in the first implementation)
    if (certificate.objectKey) {
      return `${BASE_CERTIFICATE_URL}${certificate.objectKey}`;
    }
    
    // Fallback to API URL (but this probably won't work for direct viewing)
    const apiBaseUrl = "http://localhost:8080/api/resources";
    return `${apiBaseUrl}/${certificate.id}`;
  };

  const fetchAndSetCertificates = async (usersList = users) => {
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

      const normalized = normalizeTags(mergedResources);
      
      // Add user information
      const enhancedResources = normalized.map(resource => {
        const user = usersList.find(user => user.id === resource.userId);
        return {
          ...resource,
          uploadedByName: user ? `${user.firstName} ${user.lastName}` : "Unknown User",
        };
      });
      
      setCertificateData(enhancedResources);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersData = await getUsersByRole();
        setUsers(usersData);
        
        // Filtering for students - if your API provides role information
        const studentsList = usersData.filter(user => 
          user.role === 'STUDENT' || user.role === 'student'
        );
        
        // If there's no role information, use all users
        setStudents(studentsList.length > 0 ? studentsList : usersData);
        
        await fetchAndSetCertificates(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Updated to directly set image URL without additional fetch - like in the first implementation
  useEffect(() => {
    if (!selectedCertificate || !viewModalOpen) return;
    
    try {
      setImageLoaded(false);
      setImageError(false);
      
      // Get direct image URL like the first implementation does for videos
      const imageUrl = getImageUrl(selectedCertificate);
      console.log("Setting image source:", imageUrl);
      
      // Set the URL directly (no fetch needed if using S3 URLs)
      setImageSrc(imageUrl);
      
    } catch (error) {
      console.error("Error setting image source:", error);
      setImageError(true);
    }
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
    { type: "share", icon: <Share2 size={18} />, variant: "success",
      getDisabled: (item) => item.isPublic === true
    },
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
      case "share":
        if (item.isPublic === true) {
          setInfoMessage("Public files cannot be shared individually. Anyone with access to the system can already view them.");
          setIsInfoModalOpen(true);
          return;
        }
        setActionType("share");
        setSelectedUsers([]);
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
      
      // Create an anchor element and trigger download - similar to first implementation
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', item.filename || 'certificate');
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Show success message
      setSuccessMessage(`Certificate "${item.filename || 'certificate'}" download initiated`);
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
      } else if (actionType === "share") {
        await handleShareConfirm();
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

  const handleShareConfirm = async () => {
    if (!selectedCertificate || selectedUsers.length === 0) {
      alert('Please select at least one student to share with.');
      return;
    }
    
    try {
      setSharingInProgress(true);
      
      // Share with all selected users at once by passing the array
      await shareResource(selectedCertificate.id, selectedUsers);
      
      // Show success message
      setSuccessMessage(`Certificate successfully shared with ${selectedUsers.length} selected student${selectedUsers.length > 1 ? 's' : ''}.`);
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
      
      // Reset state
      setSelectedUsers([]);
      setSelectedCertificate(null);
      
    } catch (error) {
      console.error('Share error:', error);
      alert('Error sharing certificate. Please try again.');
    } finally {
      setSharingInProgress(false);
    }
  };

  const handleUploadSave = async (data) => {
    console.log("Certificate uploaded:", data);
    try {
      // If data has individual fields, use them
      if (data.file) {
        await uploadResource(data.file, data.isPublic, data.tags);
      } else {
        // Otherwise assume we're getting a complete data object from the form
        await uploadResource(data);
      }
      
      // Refresh the data after upload
      await fetchAndSetCertificates();
      
      // Show success message
      setSuccessMessage(`Certificate "${data.filename || 'certificate'}" uploaded successfully.`);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Error handling upload:', error);
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

  // Handle user selection in share modal
  const handleUserSelect = (userId) => {
    setSelectedUsers(prevSelected => {
      // If already selected, remove it; otherwise add it
      if (prevSelected.includes(userId)) {
        return prevSelected.filter(id => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  return (
    <MentorResourceLayout
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
              {!imageSrc && !imageError && (
                <div className={styles.loadingSpinner}>Loading certificate...</div>
              )}
              
              {imageError && (
                <div className={styles.errorMessage}>
                  Failed to load image. The file might be unavailable or you may not have permission to view it.
                </div>
              )}
              
              {imageSrc && !imageError && (
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
                {selectedCertificate.isPublic !== true && (
                  <button 
                    className={styles.shareButton}
                    onClick={() => {
                      handleCloseModal();
                      setActionType("share");
                      setIsConfirmModalOpen(true);
                    }}
                  >
                    <Share2 size={16} /> Share
                  </button>
                )}
                
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title={actionType === "delete" ? "Confirm Deletion" : "Share Certificate"}
        type="confirm"
        confirmAction={handleConfirmAction}
        confirmText={actionType === "delete" ? "Delete" : "Share"}
      >
        {actionType === "delete" ? (
          <>
            <p>Are you sure you want to delete the certificate:</p>
            <p className={styles.certificateName}>"{selectedCertificate?.filename || selectedCertificate?.title}"?</p>
            <p>This action cannot be undone.</p>
          </>
        ) : actionType === "share" ? (
          <div className={styles.shareModalBody}>
            {/* Selected users section */}
            <div className={styles.shareEmailSection}>
              <h4 className={styles.shareEmailHeader}>Selected recipients</h4>
              
              <div className={styles.recipientsContainer}>
                <div className={styles.recipientsList}>
                  {selectedUsers.length > 0 ? (
                    selectedUsers.map(userId => {
                      const student = students.find(s => s.id === userId);
                      if (!student) return null;
                      
                      return (
                        <div key={userId} className={styles.recipientChip}>
                          <div className={styles.recipientAvatar}>
                            {student.firstName?.charAt(0) || ''}
                            {student.lastName?.charAt(0) || ''}
                          </div>
                          {student.firstName || ''} {student.lastName || ''}
                          <span 
                            className={styles.removeRecipient} 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUsers(prevSelected => 
                                prevSelected.filter(id => id !== userId)
                              );
                            }}
                          >
                            <X size={16} />
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className={styles.noRecipients}>No recipients selected</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className={styles.studentsList}>
              <h4 className={styles.shareEmailHeader}>Select recipients</h4>
              {students.length === 0 ? (
                <div className={styles.emptyState}>No students available to share with.</div>
              ) : (
                <div className={styles.studentsGrid}>
                  {students.map(student => (
                    <div 
                      key={student.id}
                      className={`${styles.studentItem} ${selectedUsers.includes(student.id) ? styles.selectedStudent : ''}`}
                      onClick={() => handleUserSelect(student.id)}
                    >
                      <div className={styles.studentAvatar}>
                        {student.firstName ? student.firstName.charAt(0) : ''}
                        {student.lastName ? student.lastName.charAt(0) : ''}
                      </div>
                      <div className={styles.studentInfo}>
                        <div className={styles.studentName}>
                          {student.firstName || ''} {student.lastName || ''}
                        </div>
                        <div className={styles.studentEmail}>
                          {student.email || 'No email available'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Success"
        type="success"
      >
        <p>{successMessage}</p>
      </Modal>

      {/* Info Modal for public file sharing attempt - added from first implementation */}
      <Modal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title="Information"
        type="info"
      >
        <div className={styles.infoModalContent}>
          <p>{infoMessage}</p>
        </div>
      </Modal>
    </MentorResourceLayout>
  );
};

export default MentorCertificatePage;