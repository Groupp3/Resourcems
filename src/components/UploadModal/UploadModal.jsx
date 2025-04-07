import React, { useState } from 'react';
import './UploadModal.css';

const UploadModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [access, setAccess] = useState('');
  const [type, setType] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { title, file, access, type, tag };
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Upload</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="upload-area">
            <div className="upload-icon">📁</div>
            <div className="upload-text">Click to select a file</div>
            <div className="upload-subtext">{file ? file.name : "Supported: PDF, MP4, PNG..."}</div>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="file-input"
              required
            />
          </label>

          <select
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            required
          >
            <option value="">Select Access</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="notes">Notes</option>
            <option value="video">Video</option>
            <option value="link">Certificate</option>
          </select>

          <input
            type="text"
            placeholder="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />

          <div className="buttons-container">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
