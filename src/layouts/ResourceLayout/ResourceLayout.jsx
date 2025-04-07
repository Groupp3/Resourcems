import React from 'react';
import PropTypes from 'prop-types';
import { HardDrive, Share2, Plus, Upload } from 'lucide-react';
import StorageCard from '../../components/StorageCard/StorageCard';
import FileList from '../../components/FileList/FileList';


const ResourceLayout = ({ storageData, newFiles }) => {
  return (
    <div className="resource-layout p-6 bg-gray-100 min-h-screen">
    
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Storage</h1>
        <button className="flex items-center px-3 py-1 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
          <Plus size={16} className="mr-1" />
          Add New
        </button>
      </div>
      
     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {storageData.map((item, index) => (
          <StorageCard 
            key={index}
            type={item.type}
            usedSpace={item.usedSpace}
            totalSpace={item.totalSpace}
          />
        ))}
      </div>
      
      
      <FileList files={newFiles} />
      
     
      <div className="mt-8">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Share with me</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 flex items-center justify-center shadow-sm">
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                <Share2 size={20} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
     
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-medium text-gray-800">Get more space for your storage today!</p>
            <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full flex items-center transition-colors duration-200">
              <Upload size={18} className="mr-2" />
              Upgrade Storage
            </button>
          </div>
          <div className="hidden md:flex items-center justify-center">
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
  /** Array of file objects for the file list */
  newFiles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ResourceLayout;