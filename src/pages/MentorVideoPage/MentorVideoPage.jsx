import React, { useState, useEffect } from "react";
import MentorResourceLayout from "../../layouts/MentorResourceLayout/MentorResourceLayout";
import VideoCard from "../../components/VideoCard/VideoCard";
import { getUsersByRole } from "../../services/AdminService";
import { getAccessibleResources } from "../../services/ResourceService";
import ReactPlayer from "react-player";
import { IoCloseOutline } from "react-icons/io5";
import "./MentorVideoPage.css";

const BASE_VIDEO_URL = "https://resourcebucket-1111.s3.amazonaws.com/";

const VideoCardPage = () => {
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeTab, setActiveTab] = useState("all"); // all | public | private

  const fetchAndSetVideos = async () => {
    try {
      setLoading(true);
      const usersData = await getUsersByRole();
      const resourcesData = await getAccessibleResources();
      const videoResources = resourcesData.filter(
        (item) => item.contentType && item.contentType.startsWith("video/")
      );

      const publicVideos = videoResources.filter((v) => v.isPublic);
      const privateVideos = videoResources.filter((v) => !v.isPublic);

      let filteredVideos;
      switch (activeTab) {
        case "public":
          filteredVideos = publicVideos;
          break;
        case "private":
          filteredVideos = privateVideos;
          break;
        case "all":
        default:
          filteredVideos = videoResources;
          break;
      }

      const enhancedVideos = filteredVideos.map((video) => {
        const user = usersData.find((user) => user.id === video.userId);
        return {
          id: video.id,
          title: video.title || video.filename,
          createdAt: video.createdAt,
          isPublic: video.isPublic === true,
          uploadedBy: user ? `${user.firstName} ${user.lastName}` : "Unknown User",
          role: user ? user.role : "Unknown",
          thumbnailUrl:
            video.thumbnailUrl ||
            "https://via.placeholder.com/320x180.png?text=Video",
          tags: video.tags || [],
          originalData: video,
        };
      });

      setUsers(usersData);
      setVideos(enhancedVideos);
    } catch (error) {
      console.error("Error fetching video resources:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetVideos();
  }, [activeTab]);

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
        setVideos((prev) => prev.filter((video) => video.id !== videoToDelete.id));
        if (selectedVideo?.id === videoToDelete.id) {
          handleClosePlayer();
        }
      } catch (error) {
        console.error("Error deleting video:", error);
      }
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <MentorResourceLayout
      breadcrumbItems={videoBreadcrumbs}
      pageTitle="Videos"
    >
      <div className="video-page-content">
        <div className="video-tab-container">
          <button
            className={`video-tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => handleTabChange("all")}
          >
            All Videos
          </button>
          <button
            className={`video-tab-btn ${activeTab === "private" ? "active" : ""}`}
            onClick={() => handleTabChange("private")}
          >
            Private
          </button>
          <button
            className={`video-tab-btn ${activeTab === "public" ? "active" : ""}`}
            onClick={() => handleTabChange("public")}
          >
            Public
          </button>
        </div>

        {loading ? (
          <div className="loading-message">Loading videos...</div>
        ) : videos.length > 0 ? (
          <div className="video-cards-container">
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
          </div>
        ) : (
          <p className="no-videos-message">
            {activeTab === "all"
              ? "No videos available."
              : activeTab === "private"
              ? "You don't have access to any private videos."
              : "No public videos available."}
          </p>
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
                <IoCloseOutline size={24} />
              </button>
              <h3 className="video-title">{selectedVideo.title}</h3>
            </div>
          </div>
        )}
      </div>
    </MentorResourceLayout>
  );
};

export default VideoCardPage;
