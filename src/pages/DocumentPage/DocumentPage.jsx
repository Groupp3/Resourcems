import React, { useState, useEffect } from "react";
import ResourceLayout from "../../layouts/ResourceLayout/ResourceLayout";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import { FileText, Eye, Download, Trash2, Lock, Globe, X, ZoomIn, ZoomOut, Share2, Printer } from "lucide-react";
import styles from "./DocumentPage.module.css";
import { getAccessibleResources, deleteResource, uploadResource, shareResource } from "../../services/ResourceService"; 
import { getUsersByRole } from "../../services/AdminService";
import Modal from "../../components/Modal/Modal";
import axios from "axios";

const DocumentPage = () => {
  const [documentData, setDocumentData] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const [documentError, setDocumentError] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [documentSrc, setDocumentSrc] = useState(null);
  const [students, setStudents] = useState([]);
  const [sharingInProgress, setSharingInProgress] = useState(false);

  // Modal state management
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const BASE_DOCUMENT_URL = "https://resourcebucket-1111.s3.amazonaws.com/";

  // Function to construct URL based on resource object
  const getDocumentUrl = (document) => {
    if (!document) return null;
    
    // If direct S3 URL is available in the object
    if (document.url || document.downloadUrl) {
      return document.url || document.downloadUrl;
    }
    
    // Use S3 bucket with object key (same pattern as videos)
    if (document.objectKey) {
      return `${BASE_DOCUMENT_URL}${document.objectKey}`;
    }
    
    const apiBaseUrl = "http://localhost:8080/api/resources";
    return `${apiBaseUrl}/${document.id}`;
  };

  const fetchAndSetDocuments = async (usersList = users) => {
    const refreshedData = await getAccessibleResources();
    const applicationResources = refreshedData.filter(item =>
      item.contentType && item.contentType.startsWith("application/")
    );

    const enhancedResources = applicationResources.map(resource => {
      const user = usersList.find(user => user.id === resource.userId);
      return {
        ...resource,
        uploadedByName: user ? `${user.firstName} ${user.lastName}` : "Unknown User",
      };
    });

    setDocumentData(enhancedResources);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersData = await getUsersByRole();
        setUsers(usersData);
        
        // Filter students for sharing functionality
        const studentsList = usersData.filter(user => 
          user.role === 'STUDENT' || user.role === 'student'
        );
        
        // If no students found, use all users as fallback
        setStudents(studentsList.length > 0 ? studentsList : usersData);
        
        await fetchAndSetDocuments(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Updated document loading effect
  useEffect(() => {
    if (!selectedDocument || !viewModalOpen) return;
      
    try {
      setDocumentLoaded(false);
      setDocumentError(false);
      setDocumentSrc(null);
      
      // Get direct URL
      const documentUrl = getDocumentUrl(selectedDocument);
      console.log("Setting document source:", documentUrl);
      
      // For PDFs, check if we need to handle S3 URLs specially
      if (selectedDocument.contentType && 
          (selectedDocument.contentType.includes('pdf') || 
          selectedDocument.filename?.toLowerCase().endsWith('.pdf'))) {
        
        setDocumentSrc(documentUrl);
        
        // Set a timeout to handle cases where the onLoad event might not fire
        const loadTimeout = setTimeout(() => {
          if (!documentLoaded) {
            console.log("Document load timeout - forcing loaded state");
            setDocumentLoaded(true);
          }
        }, 5000);
        
        return () => clearTimeout(loadTimeout);
      } else {
        // For non-PDF files, just set the URL
        setDocumentSrc(documentUrl);
      }
    } catch (error) {
      console.error("Error setting document source:", error);
      setDocumentError(true);
      setDocumentLoaded(true);
    }
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

  const documentActions = [
    { type: "view", icon: <Eye size={18} />, variant: "default" },
    { type: "delete", icon: <Trash2 size={18} />, variant: "danger" },
    { 
      type: "share", 
      icon: <Share2 size={18} />, 
      variant: "success",
      getDisabled: (item) => item.isPublic === true
    },
  ];

  const documentBreadcrumbs = [
    { label: "Dashboard", url: "/dashboard" },
    { label: "Resources", url: "/resources" },
    { label: "Documents" },
  ];

  const handleActionClick = async (actionType, item) => {
    console.log(`${actionType} clicked for`, item);
    setSelectedDocument(item);
    
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

 
  // Fixed handleDownload function
  const handleDownload = async (item) => {
    if (!item) {
      console.error('No document selected for download');
      return;
    }
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert('Authentication token missing. Please log in again.');
      return;
    }
    
    try {
      const downloadUrl = getDocumentUrl(item);
      console.log('Downloading from:', downloadUrl);
      
      // Create loading indicator
      const loadingToast = document.createElement('div');
      loadingToast.className = styles.loadingToast;
      loadingToast.textContent = `Downloading "${item.filename || 'document'}"...`;
      document.body.appendChild(loadingToast);
      
      const response = await axios({
        method: 'get',
        url: downloadUrl,
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`
        },
        // Add timeout and maxContentLength to handle large files
        timeout: 30000,
        maxContentLength: 100 * 1024 * 1024 // 100MB limit
      });
      
      // Check if response is valid
      if (!response.data || response.data.size === 0) {
        throw new Error('Empty response received');
      }
      
      // Create filename from either provided filename or Content-Disposition header
      let filename = item.filename;
      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1].replace(/['"]/g, '');
        }
      }
      
      // If still no filename, use fallback
      if (!filename) {
        filename = 'document_' + new Date().getTime();
        
        // Try to get extension from content type
        const contentType = response.headers['content-type'];
        if (contentType) {
          if (contentType.includes('pdf')) filename += '.pdf';
          else if (contentType.includes('word')) filename += '.docx';
          else if (contentType.includes('excel')) filename += '.xlsx';
          else if (contentType.includes('powerpoint')) filename += '.pptx';
          else if (contentType.includes('text')) filename += '.txt';
        }
      }
      
      // Create blob URL and trigger download
      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] || 'application/octet-stream' 
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
        document.body.removeChild(loadingToast);
        
        // Show success message
        setSuccessMessage(`Document "${filename}" downloaded successfully`);
        setIsSuccessModalOpen(true);
      }, 100);
      
    } catch (error) {
      console.error('Download error:', error);
      
      // Create more descriptive error message based on the error
      let errorMessage = 'Error downloading file.';
      
      if (error.response) {
        // Server responded with an error status
        if (error.response.status === 401 || error.response.status === 403) {
          errorMessage = 'You do not have permission to download this file.';
        } else if (error.response.status === 404) {
          errorMessage = 'File not found on the server.';
        } else if (error.response.status >= 500) {
          errorMessage = 'Server error occurred. Please try again later.';
        }
      } else if (error.request) {
        // Request made but no response received
        errorMessage = 'No response from server. Please check your connection.';
      } else if (error.message && error.message.includes('timeout')) {
        errorMessage = 'Download timed out. The file might be too large.';
      }
      
      alert(errorMessage);
      
      // Remove loading indicator if exists
      const loadingToast = document.querySelector('.' + styles.loadingToast);
      if (loadingToast) {
        document.body.removeChild(loadingToast);
      }
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
      
      // Show success message
      setSuccessMessage(`Document "${selectedDocument.filename || selectedDocument.title}" has been deleted.`);
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
      setSelectedDocument(null);
      
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting document. Please try again.');
    }
  };

  const handleShareConfirm = async () => {
    if (!selectedDocument || selectedUsers.length === 0) {
      alert('Please select at least one student to share with.');
      return;
    }
    
    try {
      setSharingInProgress(true);
      
      // Share with all selected users at once
      await shareResource(selectedDocument.id, selectedUsers);
      
      // Show success message
      setSuccessMessage(`Document successfully shared with ${selectedUsers.length} selected student${selectedUsers.length > 1 ? 's' : ''}.`);
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
      
      // Reset state
      setSelectedUsers([]);
      setSelectedDocument(null);
      
    } catch (error) {
      console.error('Share error:', error);
      alert('Error sharing document. Please try again.');
    } finally {
      setSharingInProgress(false);
    }
  };

  const handleUploadSave = async (data) => {
    console.log("Document uploaded:", data);
    try {
      // Refresh the data after upload
      await fetchAndSetDocuments();
      
      // Show success message
      setSuccessMessage(`Document "${data.filename || 'document'}" uploaded successfully.`);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Error refreshing documents after upload:', error);
    }
  };

  // Updated document load handler
  const handleDocumentLoaded = () => {
    console.log("Document loaded successfully");
    setDocumentLoaded(true);
  };

  // Updated document error handler
  const handleDocumentError = (e) => {
    console.error("Error displaying document:", e);
    setDocumentError(true);
    setDocumentLoaded(true); // Mark as loaded so we show the error message
  };

  // Close modal handler
  const handleCloseModal = () => {
    setViewModalOpen(false);
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

  // Add a fallback renderer for PDF display issues
  const renderFallbackMessage = () => {
    if (!documentSrc || !selectedDocument) return null;
    
    return (
      <div className={styles.fallbackMessage}>
        <p>Having trouble viewing this document?</p>
        <div className={styles.fallbackOptions}>
        
          <a 
            href={documentSrc} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.fallbackLink}
          >
            <Eye size={16} /> Open in New Tab
          </a>
        </div>
      </div>
    );
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

      {/* Document Viewer Modal - Enhanced Version */}
      {viewModalOpen && selectedDocument && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div 
            className={styles.modalContent} 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '95%',
              height: '90vh',
              maxWidth: '1300px',
            }}
          >
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
              style={{ 
                flex: '1 1 auto',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                position: 'relative',
                height: 'calc(100% - 130px)'
              }}
            >
              {!documentLoaded && !documentError && (
                <div className={styles.loadingSpinner}>Loading document...</div>
              )}
              
              {documentError && (
                <div className={styles.errorMessage}>
                  Failed to load document. The file might be unavailable or you may not have permission to view it.
                  {renderFallbackMessage()}
                </div>
              )}
              
              <div 
                className={styles.documentContainer} 
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0, 
                  bottom: 0,
                  overflow: 'auto',  
                  display: documentLoaded && !documentError ? 'block' : 'none'
                }}
              >
                {documentSrc && (
                  <object
                    data={documentSrc}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    className={styles.documentFrame}
                    onLoad={handleDocumentLoaded}
                    onError={handleDocumentError}
                    style={{ 
                      transform: `scale(${zoom})`,
                      transformOrigin: 'center top',
                      display: 'block'
                    }}
                  >
                    <iframe 
                      src={documentSrc}
                      title={selectedDocument.filename || selectedDocument.title}
                      width="100%"
                      height="100%"
                      className={styles.documentFrame}
                      onLoad={handleDocumentLoaded}
                      onError={handleDocumentError}
                      style={{ 
                        border: 'none'
                      }}
                    />
                    <p>
                      Your browser doesn't support embedded PDFs.
                      <a href={documentSrc} target="_blank" rel="noopener noreferrer">
                        Download the PDF
                      </a> instead.
                    </p>
                  </object>
                )}
                
                {/* Display fallback message after a few seconds if needed */}
                {documentLoaded && !documentError && (
                  <div style={{ marginTop: '10px' }}>
                    {renderFallbackMessage()}
                  </div>
                )}
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <p>Uploaded by: {selectedDocument.uploadedByName}</p>
              <div className={styles.actionButtons}>
              
                {selectedDocument.isPublic !== true && (
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

      {/* Confirmation & Share Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title={actionType === "delete" ? "Confirm Deletion" : "Share Document"}
        type="confirm"
        confirmAction={handleConfirmAction}
        confirmText={actionType === "delete" ? "Delete" : "Share"}
      >
        {actionType === "delete" ? (
          <>
            <p>Are you sure you want to delete the document:</p>
            <p className={styles.documentName}>"{selectedDocument?.filename || selectedDocument?.title}"?</p>
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
            
            {/* Students list for selection */}
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

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Success"
        type="success"
      >
        <p>{successMessage}</p>
      </Modal>

      {/* Info Modal for public file sharing attempt */}
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
    </ResourceLayout>
  );
};

export default DocumentPage;