// src/stories/Pagination.stories.jsx
import React, { useState } from 'react';
import Pagination from './Pagination';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    totalItems: { control: 'number', description: 'Total number of items' },
    itemsPerPage: { control: 'number', description: 'Number of items per page' },
    currentPage: { control: 'number', description: 'Current page' },
    onPageChange: { action: 'onPageChange', description: 'Page change event' },
  },
};

const Template = (args) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    args.onPageChange(page); // Trigger the action in Storybook
  };

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  totalItems: 50,
  itemsPerPage: 10,
  currentPage: 1,
};

export const CustomItemsPerPage = Template.bind({});
CustomItemsPerPage.args = {
  totalItems: 100,
  itemsPerPage: 20,
  currentPage: 1,
};
