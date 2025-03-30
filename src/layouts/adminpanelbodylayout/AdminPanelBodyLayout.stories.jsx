import React from 'react';
import AdminPanelBodyLayout from './AdminPanelBodyLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  title: 'Components/AdminPanelBodyLayout',
  component: AdminPanelBodyLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

const Template = (args) => <AdminPanelBodyLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  breadcrumbItems: [
    { label: 'Home', url: '/' },
    { label: 'Dashboard', url: '/dashboard' },
    { label: 'Admin', url: '/admin' }
  ],
  cardProps: {
    title: 'Dashboard Overview',
    content: 'Some dashboard content',
  },
  searchProps: {
    placeholder: 'Search in dashboard...',
    onSearch: (query) => console.log(query)
  }
};