import React, { useState } from "react";
import ResourceLayout from "../../layouts/ResourceLayout/ResourceLayout";
import VideoCard from "../../components/VideoCard/VideoCard";
import "./VideoCardPage.css";

const VideoCardPage = () => {
  const [videos, setVideos] = useState([
    {
      id: "1",
      title: "Introduction to React",
      createdAt: "2025-04-06T10:00:00Z",
      isPublic: true,
      uploadedBy: "John Doe",
      role: "Admin",
      thumbnailUrl: "https://via.placeholder.com/320x180.png?text=React",
      tags: ["React", "Frontend", "JavaScript"]
    },
    {
      id: "2",
      title: "Spring Boot Basics",
      createdAt: "2025-03-30T14:00:00Z",
      isPublic: false,
      uploadedBy: "Jane Smith",
      role: "Mentor",
      thumbnailUrl: "https://via.placeholder.com/320x180.png?text=Spring+Boot",
      tags: ["Java", "Backend", "Spring"]
    },
    {
      id: "3",
      title: "Advanced CSS Techniques",
      createdAt: "2025-04-01T09:30:00Z",
      isPublic: true,
      uploadedBy: "Alex Johnson",
      role: "Mentor",
      thumbnailUrl: "https://via.placeholder.com/320x180.png?text=CSS+Advanced",
      tags: ["CSS", "Design", "Frontend"]
    },
    {
      id: "4",
      title: "Database Optimization",
      createdAt: "2025-03-25T16:45:00Z",
      isPublic: true,
      uploadedBy: "Sarah Williams",
      role: "Admin",
      thumbnailUrl: "https://via.placeholder.com/320x180.png?text=Database",
      tags: ["SQL", "Performance", "Backend"]
    }
  ]);

  const handleVideoClick = (video) => {
    console.log("Video clicked:", video);
    // Navigate to video detail page or play the video
  };

  const handleVideoDelete = (videoToDelete) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      setVideos(videos.filter(video => video.id !== videoToDelete.id));
    }
  };

  const handleUploadSave = (data) => {
    console.log("Uploaded Data:", data);
    // Add new video to the videos array
    const newVideo = {
      id: Date.now().toString(),
      title: data.title || "New Video",
      createdAt: new Date().toISOString(),
      isPublic: data.isPublic || false,
      uploadedBy: "Current User",
      role: "Content Creator",
      thumbnailUrl: data.thumbnailUrl || "https://via.placeholder.com/320x180.png?text=New+Video",
      tags: data.tags || ["New"]
    };
    
    setVideos([newVideo, ...videos]);
  };

  return (
    <ResourceLayout>
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
          <p className="no-videos-message">No videos available. Click "Upload +" to add videos.</p>
        )}
      </div>
    </ResourceLayout>
  );
};

export default VideoCardPage;