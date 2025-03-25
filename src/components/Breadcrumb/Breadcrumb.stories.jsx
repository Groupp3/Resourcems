// Breadcrumb.stories.jsx
import React from 'react';
import Breadcrumb from './Breadcrumb';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: { 
      control: 'object',
      description: 'Array of breadcrumb items with label and optional URL'
    },
    separator: { 
      control: 'select',
      options: ['/', '>', '•', '-', '|', '»', '›'],
      description: 'Separator between breadcrumb items'
    },
    className: { 
      control: 'text',
      description: 'Additional CSS class for the breadcrumb'
    },
    activeClassName: { 
      control: 'text',
      description: 'CSS class for the active breadcrumb item'
    },
    onClick: { 
      action: 'clicked' 
    }
  }
};

// Template for creating stories
const Template = (args) => <Breadcrumb {...args} />;

// Basic breadcrumb
export const Default = Template.bind({});
Default.args = {
  items: [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Data' }
  ]
};

// Single item breadcrumb
export const SingleItem = Template.bind({});
SingleItem.args = {
  items: [
    { label: 'Home' }
  ]
};

// Multiple levels
export const MultipleLevels = Template.bind({});
MultipleLevels.args = {
  items: [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'Electronics', url: '/products/electronics' },
    { label: 'Computers', url: '/products/electronics/computers' },
    { label: 'Laptops' }
  ]
};

// With arrow separator
export const ArrowSeparator = Template.bind({});
ArrowSeparator.args = {
  items: [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Data' }
  ],
  separator: '>'
};

// With double arrow separator
export const DoubleArrowSeparator = Template.bind({});
DoubleArrowSeparator.args = {
  items: [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Data' }
  ],
  separator: '»'
};

// Light variant
export const LightVariant = Template.bind({});
LightVariant.args = {
  items: [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Data' }
  ],
  className: 'breadcrumb-light'
};

// Dark variant
export const DarkVariant = Template.bind({});
DarkVariant.args = {
  items: [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Data' }
  ],
  className: 'breadcrumb-dark'
};

// Transparent variant
export const TransparentVariant = Template.bind({});
TransparentVariant.args = {
  items: [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Data' }
  ],
  className: 'breadcrumb-transparent'
};

// Pill variant
export const PillVariant = Template.bind({});
PillVariant.args = {
  items: [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Data' }
  ],
  className: 'breadcrumb-pill'
};

// Small size
export const SmallSize = Template.bind({});
SmallSize.args = {
  items: [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Data' }
  ],
  className: 'breadcrumb-sm'
};

// Large size
export const LargeSize = Template.bind({});
LargeSize.args = {
  items: [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Data' }
  ],
  className: 'breadcrumb-lg'
};

// Custom styling with combined classes
export const CustomStyling = Template.bind({});
CustomStyling.args = {
  items: [
    { label: 'Home', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Data' }
  ],
  className: 'breadcrumb-dark breadcrumb-pill breadcrumb-lg',
  separator: '›'
};