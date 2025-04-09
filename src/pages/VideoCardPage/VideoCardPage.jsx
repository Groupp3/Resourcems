import React, { useState, useEffect } from "react";
import ResourceLayout from "../../layouts/ResourceLayout/ResourceLayout";
import VideoCard from "../../components/VideoCard/VideoCard";
import { getUsersByRole } from "../../services/AdminService";
import { getResources } from "../../services/ResourceService";
import ReactPlayer from "react-player";
import { AiOutlineClose } from "react-icons/ai"; // ✅ Imported close icon
import "./VideoCardPage.css";

const BASE_VIDEO_URL = "https://resourcebucket-1111.s3.amazonaws.com/";

const VideoCardPage = () => {
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersData = await getUsersByRole();
        setUsers(usersData);

        const resourcesData = await getResources();
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

  const handleUploadSave = async () => {
    try {
      const usersData = users.length ? users : await getUsersByRole();
      const resourcesData = await getResources();
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
          tags: resource.tags || [],
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
      // Removed onUploadSave prop to hide Upload button
    >
      <div className="video-page-content">
        {loading ? (
          <div className="loading-message">Loading videos...</div>
        ) : (
          <div className="video-cards-container">
            {videos.length > 0 ? (
              <div className="video-cards-row">
                {videos.map((video) => (
                  <div className="video-card-item" key={video.id}>
                    <VideoCard
                      video={video}
                      onClick={handleVideoClick}
                      onDelete={handleVideoDelete}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-videos-message">
                No videos available.
              </p>
            )}
          </div>
        )}
  
        {selectedVideo && (
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
                <AiOutlineClose size={24} /> {/* ✅ Updated Close Icon */}
              </button>
              <h3 className="video-title">{selectedVideo.title}</h3>
            </div>
          </div>
        )}
      </div>
    </ResourceLayout>
  );
  
};

export default VideoCardPage;
