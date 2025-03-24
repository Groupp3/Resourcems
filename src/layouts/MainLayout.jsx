// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sidebar from '../components/sidebar/Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: ${props => props.backgroundColor};
`;

const ContentArea = styled.div`
  margin-left: ${props => props.sidebarOpen 
    ? `${props.sidebarExpandedWidth}px` 
    : `${props.sidebarCollapsedWidth}px`};
  width: calc(100% - ${props => props.sidebarOpen 
    ? `${props.sidebarExpandedWidth}px` 
    : `${props.sidebarCollapsedWidth}px`});
  transition: margin-left 0.3s ease, width 0.3s ease;
  padding: ${props => props.contentPadding};
  overflow-y: auto;
  height: 100vh;
`;

const MainLayout = ({
  // Layout props
  children,
  backgroundColor = '#f8f9fa',
  contentPadding = '20px',
  
  // Sidebar props
  defaultSidebarOpen = true,
  sidebarProps = {},
  
  // Event handlers
  onSidebarToggle = null
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(defaultSidebarOpen);
  
  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen);
    if (onSidebarToggle) {
      onSidebarToggle(isOpen);
    }
  };
  
  // Extract sidebar width props or use defaults
  const sidebarExpandedWidth = sidebarProps.expandedWidth || 250;
  const sidebarCollapsedWidth = sidebarProps.collapsedWidth || 80;

  return (
    <LayoutContainer backgroundColor={backgroundColor}>
      <Sidebar 
        {...sidebarProps}
        defaultOpen={defaultSidebarOpen}
        onToggle={handleSidebarToggle}
      />
      <ContentArea 
        sidebarOpen={sidebarOpen}
        sidebarExpandedWidth={sidebarExpandedWidth}
        sidebarCollapsedWidth={sidebarCollapsedWidth}
        contentPadding={contentPadding}
      >
        {children}
      </ContentArea>
    </LayoutContainer>
  );
};

MainLayout.propTypes = {
  // Layout props
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  contentPadding: PropTypes.string,
  
  // Sidebar props
  defaultSidebarOpen: PropTypes.bool,
  sidebarProps: PropTypes.object,
  
  // Event handlers
  onSidebarToggle: PropTypes.func
};

export default MainLayout;