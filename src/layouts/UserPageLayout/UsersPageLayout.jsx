import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './UserPageLayout.css';

const UserPageLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const itemsPerPage = 8;

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@gmail.com', role: 'Admin', avatar: '/api/placeholder/100/100', accentColor: '#4299E1' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@gmail.com', role: 'Admin', avatar: '/api/placeholder/100/100', accentColor: '#48BB78' },
    { id: 3, name: 'Alice Brown', email: 'alice.brown@gmail.com', role: 'Mentor', avatar: '/api/placeholder/100/100', accentColor: '#ED8936' },
    { id: 4, name: 'Bob Johnson', email: 'bob.johnson@gmail.com', role: 'Mentor', avatar: '/api/placeholder/100/100', accentColor: '#9F7AEA' },
    { id: 5, name: 'Daisy Lewis', email: 'daisy.lewis@gmail.com', role: 'Student', avatar: '/api/placeholder/100/100', accentColor: '#F56565' },
  ]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
      else setSidebarOpen(true);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesTab = activeTab === 'All' || user.role === activeTab;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Simple Sidebar Component
  const Sidebar = () => (
    <div className={`sidebar ${sidebarOpen ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="avatar">
          <img src="/api/placeholder/40/40" alt="User" />
        </div>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className="active"><i className="icon home-icon"></i><span>Home</span></li>
          <li><i className="icon user-icon"></i><span>Users</span></li>
          <li><i className="icon book-icon"></i><span>Courses</span></li>
          <li><i className="icon settings-icon"></i><span>Settings</span></li>
        </ul>
      </div>
      <div className="sidebar-toggle" onClick={handleSidebarToggle}>
        {sidebarOpen ? '◀' : '▶'}
      </div>
    </div>
  );

  // Simple Header Component
  const Header = () => (
    <div className="header">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="profile">
        <span>Admin</span>
        <div className="avatar">
          <img src="/api/placeholder/40/40" alt="Profile" />
        </div>
      </div>
    </div>
  );

  // Simple UserCard Component
  const UserCard = ({ name, email, avatar, role }) => (
    <div className="user-card">
      <div className="user-avatar">
        <img src={avatar} alt={name} />
      </div>
      <div className="user-info">
        <h3>{name}</h3>
        <p>{email}</p>
        <span className={`user-role ${role.toLowerCase()}`}>{role}</span>
      </div>
      <div className="user-actions">
        <button className="edit-btn"><FaEdit /></button>
        <button className="delete-btn"><FaTrash /></button>
      </div>
    </div>
  );

  // Simple Pagination Component
  const Pagination = () => {
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button 
          key={i} 
          className={currentPage === i ? 'active' : ''}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination">
        {pages}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className={`main-content ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
        <Header />
        
        <div className="dashboard-body">
          <div className="tabs-container">
            <h1>Manage Users</h1>
            <div className="tab-navigation">
              <ul className="tabs">
                {['All', 'Admins', 'Mentors', 'Students'].map(tab => (
                  <li 
                    key={tab}
                    className={activeTab === tab ? 'active' : ''}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="user-section">
            <div className="section-header">
              <button className="add-user-btn">
                <FaPlus /> Add User
              </button>
            </div>
            
            <div className="user-cards-container">
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <UserCard
                    key={user.id}
                    name={user.name}
                    email={user.email}
                    avatar={user.avatar}
                    role={user.role}
                  />
                ))
              ) : (
                <div className="no-users-message">
                  No users found. Try adjusting your filters.
                </div>
              )}
            </div>
            
            <div className="pagination-wrapper">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPageLayout;