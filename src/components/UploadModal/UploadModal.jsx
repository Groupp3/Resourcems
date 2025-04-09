import React, { useState, useEffect } from "react";
import "./UploadModal.css";
import { getAllTags, uploadResource } from "../../services/ResourceService";

const UploadModal = ({ onClose, onSave }) => {
  const [file, setFile] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [isUploading, setIsUploading] = useState(false);

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

    const alreadyExists = availableTags.some(
      (tag) => tag.name.toLowerCase() === trimmedTag.toLowerCase()
    );
    if (alreadyExists) {
      alert("Tag already exists.");
      return;
    }

    const newTagObj = {
      tagId: `temp-${Date.now()}`,
      name: trimmedTag,
    };

    setAvailableTags((prev) => [...prev, newTagObj]);
    setSelectedTags((prev) => [...prev, trimmedTag]);
    setNewTag("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    try {
      const uploaded = await uploadResource(file, isPublic, selectedTags);
      onSave(uploaded);
      onClose();
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      alert("Upload failed. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Upload Resource</h2>
        <form onSubmit={handleSubmit}>
          <label className="upload-area">
            <div className="upload-icon">📁</div>
            <div className="upload-text">Click to select a file</div>
            <div className="upload-subtext">
              {file ? file.name : "Supported: PDF, MP4, PNG..."}
            </div>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
              className="file-input"
              required
            />
          </label>

          <select
            value={isPublic ? "true" : "false"}
            onChange={(e) => setIsPublic(e.target.value === "true")}
            required
          >
            <option value="">-- Select Access --</option>
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>

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
