import React from 'react';
import ProfileIcon from './ProfileIcon';
import './ProfileIcon.css';

export default {
  title: 'Components/ProfileIcon',
  component: ProfileIcon,
  parameters: {
    componentSubtitle: 'A customizable profile icon with name and different sizes',
  },
  argTypes: {
    src: { control: 'text' },
    name: { control: 'text' },
    alt: { control: 'text' },
    size: { 
      control: { 
        type: 'select', 
        options: ['sm', 'md', 'lg'] 
      } 
    },
    onClick: { action: 'clicked' }
  }
};

// Default profile icon
export const Default = {
  args: {
    src: 'https://via.placeholder.com/100',
    name: 'John Doe',
    size: 'md'
  }
};

// Small profile icon
export const Small = {
  args: {
    ...Default.args,
    size: 'sm'
  }
};

// Large profile icon
export const Large = {
  args: {
    ...Default.args,
    size: 'lg'
  }
};

// Without name
export const NoName = {
  args: {
    src: 'https://via.placeholder.com/100',
    size: 'md'
  }
};
