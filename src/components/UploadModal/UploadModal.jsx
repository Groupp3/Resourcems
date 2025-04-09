import React, { useState } from 'react';
import './UploadModal.css';

const UploadModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [access, setAccess] = useState('');
  const [type, setType] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [accessMethod, setAccessMethod] = useState('all');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  
  // Sample tags - you would likely fetch these from an API
  const availableTags = ['Assignment', 'Lecture', 'Reference', 'Tutorial', 'Important'];
  
  // Sample student groups/classes - you would fetch these from an API
//   const studentGroups = [
//     { id: 1, name: 'CS-101 Introduction to Programming' },
//     { id: 2, name: 'MATH-202 Linear Algebra' },
//     { id: 3, name: 'PHY-103 Physics Lab' },
//     { id: 4, name: 'ENG-201 Technical Writing' }
//   ];
  
  // Sample student database - you would likely fetch these from an API
  const studentDatabase = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Alex Johnson', email: 'alex.j@example.com' },
    { id: 4, name: 'Maria Garcia', email: 'maria.g@example.com' },
    { id: 5, name: 'Sam Wilson', email: 'sam.w@example.com' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { 
      title, 
      file, 
      access, 
      type, 
      tags, 
      accessMethod,
      selectedGroups,
      selectedStudents
    };
    onSave(formData);
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
      setShowNewTagInput(false);
    }
  };

  const handleTagSelect = (e) => {
    const selectedTag = e.target.value;
    if (selectedTag === "add-new") {
      setShowNewTagInput(true);
      setNewTag('');
    } else if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleGroupSelection = (groupId) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  const handleStudentSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length >= 2) {
      // Filter students based on search term
      const results = studentDatabase.filter(student => 
        student.name.toLowerCase().includes(term.toLowerCase()) || 
        student.email.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const addStudentAccess = (student) => {
    if (!selectedStudents.some(s => s.id === student.id)) {
      setSelectedStudents([...selectedStudents, student]);
    }
    setSearchTerm('');
    setSearchResults([]);
  };

  const removeStudentAccess = (studentId) => {
    setSelectedStudents(selectedStudents.filter(student => student.id !== studentId));
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
            <option value="" disabled>Select Access</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="" disabled>Select Type</option>
            <option value="notes">Documents</option>
            <option value="video">Video</option>
            <option value="link">Certificate</option>
          </select>

          <div className="tags-section">
            <div className="tags-input-container">
              <select
                value=""
                onChange={handleTagSelect}
              >
                <option value="" disabled>Select Tag</option>
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
                <option value="add-new">+ Add New Tag</option>
              </select>
              
              {showNewTagInput && (
                <div className="new-tag-input">
                  <input
                    type="text"
                    placeholder="New tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    autoFocus
                  />
                  <button 
                    type="button" 
                    className="add-tag-btn"
                    onClick={handleAddTag}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
            
            <div className="tags-display">
              {tags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                  <button 
                    type="button" 
                    className="remove-tag" 
                    onClick={() => removeTag(tag)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="access-permissions-section">
            <h3>Access Permissions</h3>
            
            <div className="access-methods">
              <div className="access-method">
                <input 
                  type="radio" 
                  id="access-all" 
                  name="access-method" 
                  value="all"
                  checked={accessMethod === 'all'}
                  onChange={() => setAccessMethod('all')}
                />
                <label htmlFor="access-all">All Students</label>
              </div>
              
              {/* <div className="access-method">
                <input 
                  type="radio" 
                  id="access-groups" 
                  name="access-method" 
                  value="groups"
                  checked={accessMethod === 'groups'}
                  onChange={() => setAccessMethod('groups')}
                />
                <label htmlFor="access-groups">Specific Classes/Groups</label>
              </div> */}
              
              <div className="access-method">
                <input 
                  type="radio" 
                  id="access-individuals" 
                  name="access-method" 
                  value="individuals"
                  checked={accessMethod === 'individuals'}
                  onChange={() => setAccessMethod('individuals')}
                />
                <label htmlFor="access-individuals">Individual Students</label>
              </div>
            </div>
            
            {accessMethod === 'groups' && (
              <div className="groups-selection">
                <h4>Select Classes/Groups</h4>
                <div className="groups-list">
                  {studentGroups.map(group => (
                    <div key={group.id} className="group-item">
                      <input
                        type="checkbox"
                        id={`group-${group.id}`}
                        checked={selectedGroups.includes(group.id)}
                        onChange={() => toggleGroupSelection(group.id)}
                      />
                      <label htmlFor={`group-${group.id}`}>{group.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {accessMethod === 'individuals' && (
              <div className="individuals-selection">
                <h4>Select Students</h4>
                <div className="student-search">
                  <input
                    type="text"
                    placeholder="Search by name or email"
                    value={searchTerm}
                    onChange={handleStudentSearch}
                  />
                  
                  {searchResults.length > 0 && (
                    <div className="search-results">
                      {searchResults.map(student => (
                        <div 
                          key={student.id} 
                          className="search-result-item"
                          onClick={() => addStudentAccess(student)}
                        >
                          <div className="student-name">{student.name}</div>
                          <div className="student-email">{student.email}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="selected-students">
                  {selectedStudents.length > 0 ? (
                    selectedStudents.map(student => (
                      <div key={student.id} className="selected-student">
                        <span>{student.name}</span>
                        <button
                          type="button"
                          className="remove-student"
                          onClick={() => removeStudentAccess(student.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="no-students-selected">No students selected</p>
                  )}
                </div>
              </div>
            )}
          </div>

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