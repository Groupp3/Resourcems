import React, { useEffect, useState, useRef } from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import { UserPlus, Trash2, ChevronDown, Check } from "lucide-react";
import styles from "./RequestPage.module.css";
import Modal from "../../components/Modal/Modal";
import { getPendingUsers, updateUserStatus, updateUserRole, bulkDeleteUsers } from "../../services/AdminService";

const UserAvatar = ({ firstName, lastName }) => {
  const getInitials = () => {
    let initials = "";
    
    if (firstName && firstName.length > 0) {
      initials += firstName.charAt(0).toUpperCase();
    }
    
    if (lastName && lastName.length > 0) {
      initials += lastName.charAt(0).toUpperCase();
    }
    
    return initials || "?";
  };
  
  return (
    <div className={styles.userAvatar}>
      {getInitials()}
    </div>
  );
};

const NameWithAvatar = ({ item }) => {
  const fullName = `${item.firstName || ''} ${item.lastName || ''}`.trim();
  const displayName = fullName || item.email.split('@')[0];
  
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <UserAvatar firstName={item.firstName} lastName={item.lastName} />
      <span>{displayName}</span>
    </div>
  );
};

const RoleDropdown = ({ currentRole, userId, onRoleChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState(['ADMIN', 'MENTOR', 'STUDENT']);
  const [selectedRole, setSelectedRole] = useState(currentRole || 'STUDENT');
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    
    const handleScroll = () => {
      setIsOpen(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);


  const handleToggleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleRoleSelect = async (role) => {
    if (role === selectedRole) {
      setIsOpen(false);
      return;
    }
    
    setSelectedRole(role);
    setIsOpen(false);
    
    try {
      await updateUserRole(userId, role);
      if (onRoleChange) {
        onRoleChange(userId, role);
      }
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };
  
  const getRoleColorClass = (role) => {
    const roleColors = {
      'ADMIN': { bg: '#fff0f6', color: '#d53f8c', border: '#ffadd2' },
      'MENTOR': { bg: '#ebf8ff', color: '#3182ce', border: '#bee3f8' },
      'STUDENT': { bg: '#e3f5ee', color: '#2d8a6a', border: '#c7e8dc' }
    };
    
    return roleColors[role] || { bg: '#f7fafc', color: '#4a5568', border: '#e2e8f0' };
  };

  const roleColor = getRoleColorClass(selectedRole);

  return (
    <div className={styles.roleDropdown} ref={dropdownRef}>
      <div 
        className={styles.dropdownToggle}
        onClick={handleToggleClick}
        onTouchEnd={handleToggleClick}
        style={{
          borderColor: isOpen ? roleColor.border : 'var(--layout-border)'
        }}
      >
        <span style={{ color: roleColor.color }}>{selectedRole}</span>
        <ChevronDown 
          size={16} 
          style={{ 
            marginLeft: '4px', 
            opacity: 0.7,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
        />
      </div>
      
      {isOpen && (
        <>
          <div className={styles.dropdownMenu}>
            {roles.map(role => {
              const isActive = selectedRole === role;
              const roleStyle = getRoleColorClass(role);
              
              return (
                <div 
                  key={role}
                  className={`${styles.dropdownItem} ${isActive ? styles.active : ''}`}
                  onClick={() => handleRoleSelect(role)}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handleRoleSelect(role);
                  }}
                  style={{
                    borderLeftColor: isActive ? roleStyle.color : 'transparent'
                  }}
                >
                  <span className={styles.checkIcon}>
                    {isActive && <Check size={14} />}
                  </span>
                  <span style={{ color: isActive ? roleStyle.color : 'inherit' }}>{role}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const RoleBadge = ({ role }) => {
  
  const getRoleBadgeStyle = (role) => {
    const roleColors = {
      'ADMIN': { bg: '#fff0f6', color: '#d53f8c', border: '#ffadd2' },
      'MENTOR': { bg: '#ebf8ff', color: '#3182ce', border: '#bee3f8' },
      'STUDENT': { bg: '#e3f5ee', color: '#2d8a6a', border: '#c7e8dc' }
    };
    
    return roleColors[role] || { bg: '#f7fafc', color: '#4a5568', border: '#e2e8f0' };
  };
  
  const style = getRoleBadgeStyle(role);
  
  return (
    <span 
      className={styles.roleBadge}
      style={{
        backgroundColor: style.bg,
        color: style.color,
        borderColor: style.border
      }}
    >
      {role}
    </span>
  );
};

const RequestPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const pendingUsers = await getPendingUsers();
        const formattedData = pendingUsers.map((user, index) => ({
          id: user.id,
          number: `#${index + 1}`,
          firstName: user.firstName,
          lastName: user.lastName,
          username: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          email: user.email,
          role: user.role || 'STUDENT',
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Failed to fetch pending users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleActionClick = (actionType, item) => {
    setCurrentUser(item);
    setActionType(actionType);
    setIsConfirmModalOpen(true);
  };
  
  const handleConfirmAction = async () => {
    try {
      if (actionType === "delete") {
        await updateUserStatus(currentUser.id, "REJECTED");
        setData((prevData) => prevData.filter((req) => req.id !== currentUser.id));
        setSuccessMessage(`User request from ${currentUser.firstName || currentUser.email} has been rejected.`);
      } else if (actionType === "add") {
        await updateUserStatus(currentUser.id, "APPROVED");
        setData((prevData) => prevData.filter((req) => req.id !== currentUser.id));
        setSuccessMessage(`User ${currentUser.firstName || currentUser.email} has been approved successfully.`);
      } else if (actionType === "bulkDeleteUsers") {
        const userIds = Array.isArray(currentUser) ? currentUser : [currentUser.id];
        await bulkDeleteUsers(userIds);
        setData((prevData) => prevData.filter((req) => !userIds.includes(req.id)));
        setSuccessMessage("Selected users have been deleted successfully.");
      }
      
      setIsConfirmModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error(`Failed to process action:`, error);
      setIsConfirmModalOpen(false);
      // You could add error modal here
    }
  };

  const handleRoleChange = (userId, newRole) => {
    setData(prevData => 
      prevData.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    
    // Show success message for role change
    const user = data.find(u => u.id === userId);
    if (user) {
      setSuccessMessage(`Role for ${user.firstName || user.email} updated to ${newRole} successfully.`);
      setIsSuccessModalOpen(true);
    }
  };
  
  const columns = [
    { key: "number", title: "Request #", width: "10%" },
    { 
      key: "username", 
      title: "Name", 
      width: "30%",
      render: (item) => <NameWithAvatar item={item} />
    },
    { key: "email", title: "Email", width: "30%" },
    { 
      key: "role", 
      title: "Role", 
      width: "20%",
      render: (item) => <RoleDropdown 
                          currentRole={item.role} 
                          userId={item.id} 
                          onRoleChange={handleRoleChange} 
                        />
    },
  ];
  
  const renderActionButton = (action, item) => {
    return (
      <button
        key={action.type}
        className={`${styles.actionButton} ${styles[action.variant || 'default']}`}
        onClick={() => handleActionClick(action.type, item)}
        title={action.tooltip}
      >
        {action.icon}
      </button>
    );
  };
  
  const renderRow = (row, i) => {
    return (
      <tr key={row.id || i} className={styles.userRow}>
        {columns.map((column) => (
          <td key={column.key} style={{ width: column.width }}>
            {column.render ? column.render(row) : row[column.key]}
          </td>
        ))}
        <td style={{ width: "10%", textAlign: "right" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {actions.map((action) => renderActionButton(action, row))}
          </div>
        </td>
      </tr>
    );
  };
  
  const actions = [
    { 
      type: "add", 
      icon: <UserPlus size={18} />, 
      variant: "default",
      tooltip: "Approve User"
    },
    { 
      type: "delete", 
      icon: <Trash2 size={18} />, 
      variant: "danger",
      tooltip: "Reject User"
    },
  ];

  const getModalTitle = () => {
    if (actionType === "delete") return "Confirm Rejection";
    if (actionType === "add") return "Confirm Approval";
    if (actionType === "bulkDeleteUsers") return "Confirm Bulk Delete";
    return "Confirm Action";
  };

  const getModalContent = () => {
    if (!currentUser) return "Are you sure you want to perform this action?";
    
    const userName = currentUser.firstName ? 
      `${currentUser.firstName} ${currentUser.lastName || ''}` : 
      currentUser.email;
    
    if (actionType === "delete") {
      return (
        <>
          <p>Are you sure you want to reject the access request from <strong>{userName}</strong>?</p>
          <p>This user will not be able to access the system.</p>
        </>
      );
    }
    
    if (actionType === "add") {
      return (
        <>
          <p>Are you sure you want to approve <strong>{userName}</strong> as a <strong>{currentUser.role}</strong>?</p>
          <p>This user will be granted access to the system.</p>
        </>
      );
    }
    
    if (actionType === "bulkDeleteUsers") {
      const count = Array.isArray(currentUser) ? currentUser.length : 1;
      return (
        <>
          <p>Are you sure you want to delete {count} selected user{count !== 1 ? 's' : ''}?</p>
          <p>This action cannot be undone.</p>
        </>
      );
    }
    
    return "Are you sure you want to perform this action?";
  };

  const getConfirmButtonText = () => {
    if (actionType === "delete") return "Reject";
    if (actionType === "add") return "Approve";
    if (actionType === "bulkDeleteUsers") return "Delete";
    return "Confirm";
  };

  return (
    <AdminLayout>
      <div className={styles.adminlayout}>
        <ListLayout
          type="request"
          data={data}
          columns={columns}
          actions={actions}
          onActionClick={handleActionClick}
          itemsPerPage={6}
          theme="green"
          title="Access Requests"
          loading={loading}
          renderActionButton={renderActionButton}
          renderRow={renderRow}
        />
        
      
        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title={getModalTitle()}
          type="confirm"
          confirmAction={handleConfirmAction}
          confirmText={getConfirmButtonText()}
        >
          {getModalContent()}
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

export default RequestPage;