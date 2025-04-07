import React from 'react';
import VideoCard from './VideoCard';

export default {
  title: 'Components/VideoCard',
  component: VideoCard,
  parameters: {
    componentSubtitle: 'A card component for displaying video information',
    docs: {
      description: {
        component: 'VideoCard is used to display video information in a card format with thumbnail, title, metadata, and play button.'
      }
    }
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

// Sample video data
const sampleVideo = {
  id: "82513310-9ef2-45ee-a921-c959c8ad6fba",
  fileSize: 3600408,
  isPublic: true,
  objectKey: "a2939bfc-525e-4f2b-aea6-20401d52e0c3/1742359921584_1422633-hd_1920_810_24fps.mp4",
  filename: "1422633-hd_1920_810_24fps.mp4",
  title: "learning_video.mp4",
  contentType: "video/mp4",
  userId: "a2939bfc-525e-4f2b-aea6-20401d52e0c3",
  createdAt: "2025-03-19T10:22:05.499883",
  modifiedAt: "2025-03-19T10:52:27.611546",
  uploadedBy: "Michelle Cruz",
  deletedAt: null
};

// Template for stories
const Template = (args) => <VideoCard {...args} />;

// ===== Individual Stories =====

// Default public video
export const Default = Template.bind({});
Default.args = {
  video: sampleVideo,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default appearance of the VideoCard with a public video.'
    }
  }
};

// Private video
export const PrivateVideo = Template.bind({});
PrivateVideo.args = {
  video: {
    ...sampleVideo,
    isPublic: false,
  },
};
PrivateVideo.parameters = {
  docs: {
    description: {
      story: 'VideoCard showing a private video with different visibility indicator.'
    }
  }
};

// Long title
export const LongTitle = Template.bind({});
LongTitle.args = {
  video: {
    ...sampleVideo,
    title: "This is a very long video title that should be truncated when displayed in the card component.mp4",
  },
};
LongTitle.parameters = {
  docs: {
    description: {
      story: 'VideoCard with a long title that gets truncated with ellipsis.'
    }
  }
};

// Different file sizes
export const SmallFileSize = Template.bind({});
SmallFileSize.args = {
  video: {
    ...sampleVideo,
    fileSize: 768000, // 768 KB
  },
};

export const LargeFileSize = Template.bind({});
LargeFileSize.args = {
  video: {
    ...sampleVideo,
    fileSize: 1073741824, // 1 GB
  },
};

// Recent creation
export const RecentlyCreated = Template.bind({});
RecentlyCreated.args = {
  video: {
    ...sampleVideo,
    createdAt: new Date().toISOString(), // Current time
  },
};

// ===== Grid Layout Example =====
export const GridLayout = () => {
  const videos = [
    { ...sampleVideo, id: '1', title: 'Product Demo.mp4' },
    { ...sampleVideo, id: '2', title: 'Company Overview.mp4', isPublic: false, uploadedBy: 'Kim Demo' },
    { ...sampleVideo, id: '3', title: 'Marketing Campaign.mp4', fileSize: 15000000, uploadedBy: 'Learning & Education' },
    { ...sampleVideo, id: '4', title: 'Training Series - Part 1.mp4', uploadedBy: 'Training Videos' },
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
      gap: '20px',
      padding: '20px',
      backgroundColor: '#f9fafb'
    }}>
      {videos.map(video => (
        <VideoCard key={video.id} video={video} onClick={() => console.log('Clicked:', video.title)} />
      ))}
    </div>
  );
};
GridLayout.parameters = {
  docs: {
    description: {
      story: 'Example of VideoCards arranged in a responsive grid layout.'
    }
  }
};