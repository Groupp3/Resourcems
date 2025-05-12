import React, { useState, useEffect } from "react";
import ResourceLayout from "../../layouts/ResourceLayout/ResourceLayout";
import VideoCard from "../../components/VideoCard/VideoCard";
import { getUsersByRole } from "../../services/AdminService";
import { getAccessibleResources, shareResource } from "../../services/ResourceService";
import ReactPlayer from "react-player";
import { AiOutlineClose } from "react-icons/ai";
import { Share2, X } from "lucide-react";
import Modal from "../../components/Modal/Modal";
import "./VideoCardPage.css";

const BASE_VIDEO_URL = "https://resourcebucket-1111.s3.amazonaws.com/";

const VideoCardPage = () => {
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sharingInProgress, setSharingInProgress] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersData = await getUsersByRole();
        setUsers(usersData);

        const studentsList = usersData.filter(user => 
          user.role === 'STUDENT' || user.role === 'student'
        );
        
        setStudents(studentsList.length > 0 ? studentsList : usersData);

        const resourcesData = await getAccessibleResources();
        const videoResources = resourcesData.filter(
          (item) => item.contentType && item.contentType.startsWith("video/")
        );

        const enhancedVideos = videoResources.map((video) => {
          const user = usersData.find((user) => user.id === video.userId);
          return {
            id: video.id,
            title: video.title || video.filename,
            createdAt: video.createdAt,
            isPublic: video.isPublic === true,
            uploadedBy: user
              ? `${user.firstName} ${user.lastName}`
              : "Unknown User",
            role: user ? user.role : "Unknown",
            thumbnailUrl:
              video.thumbnailUrl ||
              "https://via.placeholder.com/320x180.png?text=Video",
            tags: video.tags || [],
            originalData: video,
          };
        });

        setVideos(enhancedVideos);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const videoBreadcrumbs = [
    { label: "Dashboard", url: "/dashboard" },
    { label: "Resources", url: "/resources" },
    { label: "Videos" },
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  const handleVideoDelete = async (videoToDelete) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        setVideos(videos.filter((video) => video.id !== videoToDelete.id));
        if (selectedVideo?.id === videoToDelete.id) {
          handleClosePlayer();
        }
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    }
  };

  const handleVideoShare = (video) => {
    if (video.isPublic === true) {
      setInfoMessage("Public videos cannot be shared individually. Anyone with access to the system can already view them.");
      setIsInfoModalOpen(true);
      return;
    }
    
    setSelectedVideo(video);
    setActionType("share");
    setSelectedUsers([]);
    setIsConfirmModalOpen(true);
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prevSelected => {
    
      if (prevSelected.includes(userId)) {
        return prevSelected.filter(id => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };


  const handleShareConfirm = async () => {
    if (!selectedVideo || selectedUsers.length === 0) {
      alert('Please select at least one student to share with.');
      return;
    }
    
    try {
      setSharingInProgress(true);
      
      
      await shareResource(selectedVideo.id, selectedUsers);
      
      
      setSuccessMessage(`Video "${selectedVideo.title}" successfully shared with ${selectedUsers.length} selected student${selectedUsers.length > 1 ? 's' : ''}.`);
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
      
 
      setSelectedUsers([]);
      
    } catch (error) {
      console.error('Share error:', error);
      alert('Error sharing video. Please try again.');
    } finally {
      setSharingInProgress(false);
    }
  };

  const handleUploadSave = async () => {
    try {
      const usersData = users.length ? users : await getUsersByRole();
      const resourcesData = await getAccessibleResources();
      const videoResources = resourcesData.filter(
        (item) => item.contentType && item.contentType.startsWith("video/")
      );

      const enhancedVideos = videoResources.map((video) => {
        const user = usersData.find((user) => user.id === video.userId);
        return {
          id: video.id,
          title: video.title || video.filename,
          createdAt: video.createdAt,
          isPublic: video.isPublic === true,
          uploadedBy: user
            ? `${user.firstName} ${user.lastName}`
            : "Unknown User",
          role: user ? user.role : "Unknown",
          thumbnailUrl:
            video.thumbnailUrl ||
            "https://via.placeholder.com/320x180.png?text=Video",
          tags: video.tags || [],
          originalData: video,
        };
      });

      setVideos(enhancedVideos);
    } catch (error) {
      console.error("Error refreshing videos after upload:", error);
    }
  };

  return (
    <ResourceLayout
      breadcrumbItems={videoBreadcrumbs}
      pageTitle="Videos"
      onUploadSave={handleUploadSave}
    >
      <div className="video-page-content">
        {loading ? (
          <div className="loading-message">Loading videos...</div>
        ) : (
          <div className="video-page-content">
          {videos.length > 0 ? (
            <div className="video-cards-container">
              {videos.map((video) => (
                <div className="video-card-item" key={video.id}>
                  <VideoCard
                    video={video}
                    onClick={handleVideoClick}
                    onDelete={handleVideoDelete}
                    onShare={handleVideoShare}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="no-videos-message">No videos available.</p>
          )}
        </div>
        
        )}
  
        {selectedVideo && actionType !== "share" && (
          <div className="video-modal-overlay" onClick={handleClosePlayer}>
            <div
              className="video-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <ReactPlayer
                url={`${BASE_VIDEO_URL}${selectedVideo.originalData.objectKey}`}
                controls
                width="100%"
                height="100%"
              />
              <button className="video-close-btn" onClick={handleClosePlayer}>
                <AiOutlineClose size={24} />
              </button>
              <h3 className="video-title">{selectedVideo.title}</h3>
              
              {!selectedVideo.isPublic && (
                <div className="video-player-actions">
                  <button 
                    className="video-share-btn"
                    onClick={() => {
                      handleClosePlayer();
                      handleVideoShare(selectedVideo);
                    }}
                  >
                    <Share2 size={16} /> Share
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

       
        <Modal
          isOpen={isConfirmModalOpen && actionType === "share"}
          onClose={() => setIsConfirmModalOpen(false)}
          title="Share Video"
          type="confirm"
          confirmAction={handleShareConfirm}
          confirmText="Share"
        >
          <div className="share-modal-body">
            {/* Selected users section */}
            <div className="share-email-section">
              <h4 className="share-email-header">Selected recipients</h4>
              
              <div className="recipients-container">
                <div className="recipients-list">
                  {selectedUsers.length > 0 ? (
                    selectedUsers.map(userId => {
                      const student = students.find(s => s.id === userId);
                      if (!student) return null;
                      
                      return (
                        <div key={userId} className="recipient-chip">
                          <div className="recipient-avatar">
                            {student.firstName?.charAt(0) || ''}
                            {student.lastName?.charAt(0) || ''}
                          </div>
                          {student.firstName || ''} {student.lastName || ''}
                          <span 
                            className="remove-recipient" 
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
                    <div className="no-recipients">No recipients selected</div>
                  )}
                </div>
              </div>
            </div>
            
           
            <div className="students-list">
              <h4 className="share-email-header">Select recipients</h4>
              {students.length === 0 ? (
                <div className="empty-state">No students available to share with.</div>
              ) : (
                <div className="students-grid">
                  {students.map(student => (
                    <div 
                      key={student.id}
                      className={`student-item ${selectedUsers.includes(student.id) ? 'selected-student' : ''}`}
                      onClick={() => handleUserSelect(student.id)}
                    >
                      <div className="student-avatar">
                        {student.firstName ? student.firstName.charAt(0) : ''}
                        {student.lastName ? student.lastName.charAt(0) : ''}
                      </div>
                      <div className="student-info">
                        <div className="student-name">
                          {student.firstName || ''} {student.lastName || ''}
                        </div>
                        <div className="student-email">
                          {student.email || 'No email available'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Modal>

    
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
          <div className="info-modal-content">
            <p>{infoMessage}</p>
          </div>
        </Modal>
      </div>
    </ResourceLayout>
  );
};

export default VideoCardPage;