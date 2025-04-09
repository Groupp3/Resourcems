// Updated UsersPage.jsx with modal implementation
import React, { useState, useEffect } from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import { getUsersByRole, updateUserRole, softDeleteUser } from "../../services/AdminService";
import UserCard from "../../components/UserCard/UserCard";
import Modal from "../../components/Modal/Modal";
import { FaList, FaTh } from "react-icons/fa";
import styles from "./UsersPage.module.css";

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Modal states
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const allUsers = await getUsersByRole();
      setUsersData(allUsers);
    } catch (error) {
      console.error("Error fetching users: ", error);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const tabs = ["All", "Admin", "Mentor", "Student"];

  const handleRoleChange = async (userId, newRole) => {
    try {
      // Enhanced validation with detailed logging
      if (!newRole || newRole.trim() === "") {
        console.error("Role name is required and cannot be empty");
        return;
      }
      
      const normalizedRole = newRole.trim();
      
      // Call the API to update the user's role
      await updateUserRole(userId, normalizedRole);
      
      // Update user role in the local state
      setUsersData(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, role: normalizedRole } : user
        )
      );
      
      // Show success modal
      setSuccessMessage(`User role updated successfully to ${normalizedRole}`);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error(`Failed to update role for user ${userId}:`, error);
      // You could add error modal here
    }
  };

  const handleDeleteClick = (user) => {
    setCurrentUser(user);
    setActionType("delete");
    setIsConfirmModalOpen(true);
  };

  const handleConfirmAction = async () => {
    try {
      if (actionType === "delete") {
        // Call the API to soft delete the user
        await softDeleteUser(currentUser.id);
        
        // Remove the deleted user from the local state
        setUsersData(prevUsers => prevUsers.filter(user => user.id !== currentUser.id));
        
        // Show success modal
        setSuccessMessage("User deleted successfully");
        setIsConfirmModalOpen(false);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error(`Failed to ${actionType} user:`, error);
      // You could add error modal here
    }
  };

  const filteredUsers = usersData.filter(user => {
    const nameMatch = (user.firstName?.toLowerCase() + " " + user.lastName?.toLowerCase())
      .includes(searchQuery.toLowerCase());

    if (activeTab === "All") return nameMatch;
    return nameMatch && user.role.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <AdminLayout>
      <div className={styles.verlofPage}>
        <div className={styles.verlofTabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.verlofTabButton} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.verlofSearchContainer}>
          <div className={styles.verlofSearch}>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.verlofViewToggle}>
            <button 
              className={`${styles.listViewBtn} ${viewMode === "list" ? styles.active : ""}`}
              onClick={() => setViewMode("list")}
            >
              <FaList />
            </button>
            <button 
              className={`${styles.gridViewBtn} ${viewMode === "grid" ? styles.active : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <FaTh />
            </button>
          </div>
        </div>

        {error && (
          <div className={styles.errorMessage}>{error}</div>
        )}

        {loading ? (
          <div className={styles.loadingIndicator}>Loading users...</div>
        ) : (
          <div className={`${styles.usersView} ${styles[viewMode]}`}>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  name={`${user.firstName} ${user.lastName || ""}`}
                  email={user.email || "example@email.com"}
                  avatar={user.profileImageUrl || "https://via.placeholder.com/150"}
                  role={user.role}
                  onRoleChange={(newRole) => handleRoleChange(user.id, newRole)}
                  onDelete={() => handleDeleteClick(user)}
                />
              ))
            ) : (
              <div className={styles.noUsersFound}>
                No users found matching your criteria.
              </div>
            )}
          </div>
        )}
        
        {/* Confirmation Modal */}
        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title="Confirm Deletion"
          type="confirm"
          confirmAction={handleConfirmAction}
          confirmText="Delete"
        >
          <p>
            Are you sure you want to delete user 
            {currentUser ? ` ${currentUser.firstName} ${currentUser.lastName}` : ''}?
          </p>
          <p>This action cannot be undone.</p>
        </Modal>
        
        {/* Success Modal */}
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title="Success"
          type="success"
        >
          <p>{successMessage}</p>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;