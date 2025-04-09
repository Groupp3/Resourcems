import React from 'react';
import PropTypes from 'prop-types';
import { HardDrive, Share2, Plus, Upload, FileText, Image, File } from 'lucide-react';
import StorageCard from '../../components/StorageCard/StorageCard';
import FileList from '../../components/FileList/FileList';
import './ResourceLayout.css'; // Import the custom CSS

const ResourceLayout = ({ storageData, newFiles }) => {
  // Helper function to get the appropriate icon based on file type
  const getFileIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'document': return <FileText className="text-purple-600" />;
      case 'image': return <Image className="text-orange-500" />;
      default: return <File className="text-blue-500" />;
    }
  };

  return (
    <div className="resource-layout">
      {/* Add pattern overlay for visual interest */}
      <div className="pattern-overlay"></div>
      
      {/* Header section */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <HardDrive className="mr-3 text-purple-600" />
          Storage Dashboard
        </h1>
        <button className="add-new-button flex items-center px-4 py-2 text-white rounded-full">
          <Plus size={18} className="mr-2" />
          Add New
        </button>
      </div>
      
      {/* Storage cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {storageData.map((item, index) => (
          <div 
            key={index} 
            className={`storage-card storage-card-${item.type.toLowerCase()}`}
          >
            <div className="p-6">
              <div className={`card-icon`}>
                {item.type === 'documents' ? (
                  <FileText size={24} />
                ) : item.type === 'images' ? (
                  <Image size={24} />
                ) : (
                  <File size={24} />
                )}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.type.toUpperCase()}
              </h3>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {item.usedSpace} GB <span className="text-base font-normal text-gray-500">/ {item.totalSpace} GB</span>
              </h2>
              
              <div className="w-full bg-white/50 rounded-full h-2 mb-2">
                <div 
                  className={`h-full rounded-full progress-bar-${item.type.toLowerCase()}`}
                  style={{ width: `${(item.usedSpace / item.totalSpace) * 100}%`, backgroundColor: 
                    item.type === 'documents' ? '#7e64ff' : 
                    item.type === 'images' ? '#ff8d4e' : '#4ecaff' }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>{((item.usedSpace / item.totalSpace) * 100).toFixed(0)}% used</span>
                <span>{(item.totalSpace - item.usedSpace).toFixed(1)} GB free</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* File list section */}
      <div className="file-list-container mb-8">
        <div className="file-list-header">
          <h3 className="flex items-center text-lg font-semibold text-gray-800">
            <FileText className="mr-2 text-purple-600" /> Recent Files
          </h3>
        </div>
        
        <div className="p-6">
          {newFiles.map((file, index) => (
            <div key={index} className="file-item flex items-center p-4 rounded-lg mb-2">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center icon-${file.type.toLowerCase()}`}>
                {getFileIcon(file.type)}
              </div>
              
              <div className="ml-4">
                <h4 className="font-medium text-gray-800">{file.name}</h4>
                <p className="text-sm text-gray-500">{file.size}</p>
              </div>
              
              <div className="ml-auto">
                <span className="text-sm text-gray-500">Yesterday</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Share with me section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Share2 className="mr-2 text-orange-500" /> Shared with me
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="share-item">
              <div className="share-icon">
                <Share2 size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Upgrade panel */}
      <div className="upgrade-panel p-6 relative">
        <div className="flex md:flex-row flex-col justify-between items-center relative z-10">
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-2">Get more space for your storage today!</p>
            <p className="text-gray-600 mb-4">Upgrade your plan to access more storage space and features.</p>
            <button className="upgrade-button flex items-center px-6 py-2 text-white rounded-full">
              <Upload size={18} className="mr-2" />
              Upgrade Storage
            </button>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <HardDrive size={40} className="text-blue-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ResourceLayout.propTypes = {
  storageData: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      usedSpace: PropTypes.number.isRequired,
      totalSpace: PropTypes.number.isRequired
    })
  ).isRequired,
  newFiles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ResourceLayout;