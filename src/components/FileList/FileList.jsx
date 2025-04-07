import React from 'react';
import './FileList.css';

const FileList = ({ files = [], onShare }) => {
  // Function to get the appropriate background color for file type
  const getFileTypeColor = (fileType) => {
    switch (fileType.toLowerCase()) {
      case 'mp3':
        return '#ff8da9'; // Pink color for MP3
      case 'pdf':
      case 'docx':
      case 'xlsx':
        return '#ffb87b'; // Orange color for PDF
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'svg':
      case 'psd':
        return '#c07bff'; // Purple color for images
      default:
        return '#e0e0e0'; // Default gray
    }
  };

  // Function to extract file extension
  const getFileExtension = (filename) => {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';
  };

  return (
    <div className="file-list-container">
      
      
      <div className="file-list-header">
        <div className="file-name-header">Name</div>
        <div className="file-size-header">Size</div>
      </div>
      
      <div className="file-items">
        {files.map((file, index) => {
          const fileExt = getFileExtension(file.name);
          return (
            <div key={index} className="file-item">
              <div className="file-info">
                <div 
                  className="file-type-badge" 
                  style={{ backgroundColor: getFileTypeColor(fileExt) }}
                >
                  {fileExt}
                </div>
                <div className="file-name" title={file.name}>{file.name}</div>
              </div>
              <div className="file-size">{file.size}</div>
            </div>
          );
        })}
      </div>
     
    </div>
  );
};

export default FileList;