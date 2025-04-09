import React, { useState, useEffect } from "react";
import "./UploadModal.css";
import { getAllTags, uploadResource } from "../../services/ResourceService";

const UploadModal = ({ onClose, onSave }) => {
  const [files, setFiles] = useState([]);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getAllTags();
        setAvailableTags(tags);
      } catch (error) {
        console.error("Failed to fetch tags", error);
      }
    };
    fetchTags();
  }, []);

  const handleTagToggle = (tagName) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((tag) => tag !== tagName)
        : [...prev, tagName]
    );
  };

  const handleAddNewTag = () => {
    const trimmedTag = newTag.trim();
    if (!trimmedTag) return;

    const alreadyExists = availableTags.some((tag) => tag.name.toLowerCase() === trimmedTag.toLowerCase());
    if (alreadyExists) {
      alert("Tag already exists.");
      return;
    }

    // Add to local available and selected tags
    const newTagObj = {
      tagId: `temp-${Date.now()}`, // Temporary ID for rendering
      name: trimmedTag,
    };

    setAvailableTags((prev) => [...prev, newTagObj]);
    setSelectedTags((prev) => [...prev, trimmedTag]);
    setNewTag("");
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }

    setIsUploading(true);
    try {
      // Upload files one by one and track progress
      const uploadedFiles = [];
      const fileCount = files.length;
      
      for (let i = 0; i < fileCount; i++) {
        const file = files[i];
        console.log(`Uploading file ${i+1}/${fileCount}: ${file.name} with tags:`, selectedTags);
        
        const uploaded = await uploadResource(file, isPublic, selectedTags);
        uploadedFiles.push(uploaded);
        
        // Update progress
        setUploadProgress(Math.floor(((i + 1) / fileCount) * 100));
      }
      
      // Refresh tags
      const updatedTags = await getAllTags();
      setAvailableTags(updatedTags);
      
      // Pass all uploaded files to parent component
      onSave(uploadedFiles);
      onClose();
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed. Check console for details.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const preventDefaultDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-backdrop"></div>
        <h2>Upload Resources</h2>
        <form onSubmit={handleSubmit}>
          <label 
            className={`upload-area ${files.length > 0 ? 'has-files' : ''}`}
            onDragOver={preventDefaultDrag}
            onDragEnter={preventDefaultDrag}
            onDrop={handleFileDrop}
          >
            <div className="upload-icon">📁</div>
            <div className="upload-text">Click or drag to select files</div>
            <div className="upload-subtext">
              {files.length > 0 
                ? `${files.length} file${files.length > 1 ? 's' : ''} selected` 
                : "Supported: PDF, MP4, PNG..."}
            </div>
            {files.length > 0 && (
              <div className="file-list">
                {files.map((file, index) => (
                  <div key={index} className="file-item">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                ))}
              </div>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
              multiple
              required
            />
          </label>

          <div className="form-group">
            <label>Access Level</label>
            <select
              value={isPublic ? "true" : "false"}
              onChange={(e) => setIsPublic(e.target.value === "true")}
              required
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </select>
          </div>

          <div className="tag-section">
            <p>Select Tags:</p>
            <div className="tag-list">
              {availableTags.length > 0 ? (
                availableTags.map((tag) => (
                  <label key={tag.tagId} className="tag-checkbox">
                    <input
                      type="checkbox"
                      value={tag.name}
                      checked={selectedTags.includes(tag.name)}
                      onChange={() => handleTagToggle(tag.name)}
                    />
                    {tag.name}
                  </label>
                ))
              ) : (
                <p>Loading tags...</p>
              )}
            </div>

            <div className="add-tag-container">
              <input
                type="text"
                placeholder="New tag name"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="new-tag-input"
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddNewTag}
              >
                Add Tag
              </button>
            </div>
          </div>

          {isUploading && (
            <div className="upload-progress">
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
              </div>
              <div className="progress-text">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
            </div>
          )}

          <div className="buttons-container">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;