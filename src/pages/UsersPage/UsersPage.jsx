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
      if (!newRole || newRole.trim() === "") {
        console.error("Role name is required and cannot be empty");
        return;
      }

      const normalizedRole = newRole.trim();
      await updateUserRole(userId, normalizedRole);

      setUsersData(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, role: normalizedRole } : user
        )
      );

      setSuccessMessage(`User role updated successfully to ${normalizedRole}`);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error(`Failed to update role for user ${userId}:`, error);
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
        await softDeleteUser(currentUser.id);
        setUsersData(prevUsers => prevUsers.filter(user => user.id !== currentUser.id));
        setSuccessMessage("User deleted successfully");
        setIsConfirmModalOpen(false);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error(`Failed to ${actionType} user:`, error);
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
      <div className={styles.adminLayout}>
        <div className={styles.userTabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles.userTabButton} ${activeTab === tab ? styles.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={styles.userSearchContainer}>
          <div className={styles.userSearch}>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
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
                  userId={user.id}
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
