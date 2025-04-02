import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import ListLayout from "../../layouts/ListLayout/ListLayout";
import { Edit, Trash2 } from "lucide-react";
import styles from "./RequestPage.module.css";
import { getPendingUsers } from "../../services/AdminService";

const columns = [
  { key: "number", title: "Request #", width: "15%" },
  { key: "username", title: "Name", width: "25%" },
  { key: "email", title: "Email", width: "30%" },
  { key: "role", title: "Role", width: "20%" },
];

const actions = [
  { type: "edit", icon: <Edit size={18} />, variant: "default" },
  { type: "delete", icon: <Trash2 size={18} />, variant: "danger" },
];

const RequestPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const pendingUsers = await getPendingUsers();
      const formattedData = pendingUsers.map((user, index) => ({
        id: user.id,
        number: `#${index + 1}`,
        username: user.name,
        email: user.email,
        role: user.role,
      }));
      setData(formattedData);
    };
    fetchRequests();
  }, []);

  const handleActionClick = (actionType, item) => {
    if (actionType === "delete") {
      setData((prevData) => prevData.filter((req) => req.id !== item.id));
    } else {
      console.log(`${actionType} clicked for`, item);
    }
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
          itemsPerPage={4}
          theme="green"
          title="Access Requests"
        />
      </div>
    </AdminLayout>
  );
};

export default RequestPage;