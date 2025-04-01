import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  FileText, 
  Eye, 
  Download, 
  Trash2, 
  Edit, 
  UserPlus, 
  Trash, 
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import './List.css';

// Avatar component to display initials
const Avatar = ({ name, size = 32 }) => {
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return names[0][0].toUpperCase();
  };

  return (
    <div 
      className="avatar" 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        backgroundColor: '#E2D9FD',
        color: '#333',
        fontSize: `${size / 2}px`,
        lineHeight: `${size}px`
      }}
    >
      {getInitials(name)}
    </div>
  );
};

const ActionButton = ({ icon, onClick, variant = 'default' }) => (
  <button 
    className={`action-btn action-btn-${variant}`} 
    onClick={onClick}
  >
    {icon}
  </button>
);

ActionButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'primary', 'danger'])
};

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, theme }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Generate page numbers with ellipses for large page counts
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // Show first 3 pages, ellipsis, and last page
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page, ellipsis, and last 3 pages
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // Show first page, ellipsis, current page and neighbors, ellipsis, last page
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`pagination-container pagination-theme-${theme}`}>
      <button 
        onClick={handlePrevClick} 
        disabled={currentPage === 1}
        className="pagination-arrow"
      >
        <ChevronLeft size={16} />
      </button>
      
      {pageNumbers.map((number, index) => (
        number === '...' ? 
        <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span> :
        <button
          key={number}
          onClick={() => handlePageClick(number)}
          className={currentPage === number ? 'active' : ''}
        >
          {number}
        </button>
      ))}
      
      <button 
        onClick={handleNextClick} 
        disabled={currentPage === totalPages}
        className="pagination-arrow"
      >
        <ChevronRight size={16} />
      </button>
      
      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

const List = ({
  data,
  type = 'document', // 'document' or 'request'
  columns,
  actions,
  onActionClick,
  itemsPerPage = 10,
  theme = 'default'
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Toggle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentItems.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Toggle select individual item
  const handleSelectItem = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (typeof onActionClick === 'function') {
      onActionClick('bulkDelete', selectedItems);
    }
    setSelectedItems([]);
    setSelectAll(false);
  };

  // Render different list types based on configuration
  const renderListContent = () => {
    return currentItems.map((item, index) => (
      <div key={item.id || index} className="list-row">
        <div className="list-cell select-item">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleSelectItem(item.id)}
              className="list-checkbox"
            />
            <span className="checkmark"></span>
          </label>
        </div>
        
        {columns.map((column, colIndex) => {
          // Special handling for name column in request type
          if (type === 'request' && column.key === 'username') {
            return (
              <div 
                key={column.key} 
                className={`list-cell ${column.className || ''}`}
                style={{ width: column.width || 'auto' }}
              >
                <div className="user-info">
                  <Avatar name={item[column.key]} size={32} />
                  <span className="user-name">{item[column.key]}</span>
                </div>
              </div>
            );
          }
          
          return (
            <div 
              key={column.key} 
              className={`list-cell ${column.className || ''}`}
              style={{ width: column.width || 'auto' }}
            >
              {column.render ? column.render(item) : item[column.key]}
            </div>
          );
        })}
        
        {actions && (
          <div className="list-cell list-actions">
            {actions.map((action, actionIndex) => (
              <ActionButton
                key={actionIndex}
                icon={action.icon}
                variant={action.variant}
                onClick={() => onActionClick(action.type, item)}
              />
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className={`list-container list-${type} list-theme-${theme}`}>
      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bulk-actions">
          <span>{selectedItems.length} items selected</span>
          <button 
            className="bulk-delete-btn"
            onClick={handleBulkDelete}
          >
            <Trash2 size={16} />
            Delete Selected
          </button>
        </div>
      )}
      
      {/* List Header */}
      <div className="list-header">
        <div className="list-header-cell select-all">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="list-checkbox"
            />
            <span className="checkmark"></span>
          </label>
        </div>
        
        {columns.map((column) => (
          <div 
            key={column.key} 
            className="list-header-cell"
            style={{ width: column.width || 'auto' }}
          >
            {column.title}
          </div>
        ))}
        {actions && <div className="list-header-cell">Actions</div>}
      </div>

      {/* List Content */}
      <div className="list-body">
        {data.length > 0 ? (
          renderListContent()
        ) : (
          <div className="list-empty">No items to display</div>
        )}
      </div>
      
      {/* Pagination */}
      
    </div>
  );
};

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.oneOf(['document', 'request']),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      render: PropTypes.func,
      width: PropTypes.string,
      className: PropTypes.string
    })
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      variant: PropTypes.oneOf(['default', 'primary', 'danger'])
    })
  ),
  onActionClick: PropTypes.func,
  itemsPerPage: PropTypes.number,
  theme: PropTypes.string
};

export default List;