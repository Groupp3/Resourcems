import React from 'react';
import { 
  FileText, 
  Eye, 
  Download, 
  Trash2, 
  Edit, 
  UserPlus, 
  Trash, 
  Lock, 
  Globe 
} from 'lucide-react';
import List from './List';

export default {
  title: 'Components/List',
  component: List,
};

// Document List Example
export const DocumentList = () => {
  const documentData = [
    { 
      id: 1, 
      name: 'Project Proposal.pdf', 
      type: 'PDF', 
      size: '2.5 MB', 
      uploadedBy: 'John Doe',
      access: 'public'
    },
    { 
      id: 2, 
      name: 'Financial Report.xlsx', 
      type: 'Excel', 
      size: '1.2 MB', 
      uploadedBy: 'Jane Smith',
      access: 'private'
    }
  ];

  const documentColumns = [
    {
      key: 'document',
      title: 'Document',
      render: (item) => (
        <div className="document-info flex items-center space-x-2">
          <FileText className="document-icon" size={18} />
          <span className="document-name">{item.name}</span>
        </div>
      ),
      width: '40%'
    },
    {
      key: 'uploadedBy',
      title: 'Uploaded By',
      width: '30%'
    },
    {
      key: 'access',
      title: 'Access',
      render: (item) => (
        <div className="access-icon">
          {item.access === 'public' ? <Globe size={18} /> : <Lock size={18} />}
        </div>
      ),
      width: '20%'
    }
  ];

  const documentActions = [
    { 
      type: 'view', 
      icon: <Eye size={18} />,
      variant: 'default'
    },
    { 
      type: 'download', 
      icon: <Download size={18} />,
      variant: 'primary'
    },
    { 
      type: 'delete', 
      icon: <Trash2 size={18} />,
      variant: 'danger'
    }
  ];

  return (
    <List
      type="document"
      data={documentData}
      columns={documentColumns}
      actions={documentActions}
      onActionClick={(actionType, item) => {
        console.log(`${actionType} clicked for`, item);
      }}
    />
  );
};

// Request List Example
export const RequestList = () => {
  const requestData = [
    { 
      id: 1, 
      number: '#001', 
      username: 'John Doe', 
      email: 'john@example.com', 
      role: 'Student' 
    },
    { 
      id: 2, 
      number: '#002', 
      username: 'Jane Smith', 
      email: 'jane@example.com', 
      role: 'Mentor' 
    }
  ];

  const requestColumns = [
    {
      key: 'number',
      title: 'Request #',
      width: '15%'
    },
    {
      key: 'username',
      title: 'Name',
      width: '25%'
    },
    {
      key: 'email',
      title: 'Email',
      width: '30%'
    },
    {
      key: 'role',
      title: 'Role',
      width: '20%'
    }
  ];

  const requestActions = [
    { 
      type: 'edit', 
      icon: <Edit size={18} />,
      variant: 'default'
    },
    { 
      type: 'add', 
      icon: <UserPlus size={18} />,
      variant: 'primary'
    },
    { 
      type: 'delete', 
      icon: <Trash size={18} />,
      variant: 'danger'
    }
  ];

  return (
    <List
      type="request"
      data={requestData}
      columns={requestColumns}
      actions={requestActions}
      onActionClick={(actionType, item) => {
        console.log(`${actionType} clicked for`, item);
      }}
    />
  );
};
