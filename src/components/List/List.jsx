import React from 'react';
import PropTypes from 'prop-types';
import { 
  FileText, 
  Eye, 
  Download, 
  Trash2, 
  Edit, 
  UserPlus, 
  Trash 
} from 'lucide-react';
import './List.css';

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

const List = ({
  data,
  type = 'document', // 'document' or 'request'
  columns,
  actions,
  onActionClick
}) => {
  // Render different list types based on configuration
  const renderListContent = () => {
    return data.map((item, index) => (
      <div key={item.id || index} className="list-row">
        {columns.map((column, colIndex) => (
          <div 
            key={column.key} 
            className={`list-cell ${column.className || ''}`}
            style={{ width: column.width || 'auto' }}
          >
            {column.render ? column.render(item) : item[column.key]}
          </div>
        ))}
        
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
    <div className={`list-container list-${type}`}>
      {/* List Header */}
      <div className="list-header">
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
  onActionClick: PropTypes.func
};

export default List;