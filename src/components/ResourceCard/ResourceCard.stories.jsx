// ResourceCard.stories.jsx
import React from 'react';
import { FaImage, FaFileAlt, FaMusic } from 'react-icons/fa';
import ResourceCard from './ResourceCard';

export default {
  title: 'Components/ResourceCard',
  component: ResourceCard,
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '320px',
            height: '568px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '900px',
          },
        },
      },
    },
  },
  argTypes: {
    color: { control: 'color' },
    noFiles: { control: { type: 'number', min: 0, max: 1000 } },
  },
};

const Template = (args) => <ResourceCard {...args} />;

export const Images = Template.bind({});
Images.args = {
  icon: <FaImage />,
  title: 'Images',
  noFiles: 24,
  color: '#8A3FFC', // Purple
};

export const Documents = Template.bind({});
Documents.args = {
  icon: <FaFileAlt />,
  title: 'Documents',
  noFiles: 10,
  color: '#FF9A3D', // Orange
};

export const Music = Template.bind({});
Music.args = {
  icon: <FaMusic />,
  title: 'Music',
  noFiles: 16,
  color: '#FF1CF7', // Pink
};

// Responsive grid layout example
export const ResponsiveGrid = () => (
  <div className="responsive-grid">
    <ResourceCard 
      icon={<FaImage />} 
      title="Images" 
      noFiles={24} 
      color="#8A3FFC"
    />
    <ResourceCard 
      icon={<FaFileAlt />} 
      title="Documents" 
      noFiles={10} 
      color="#FF9A3D"
    />
    <ResourceCard 
      icon={<FaMusic />} 
      title="Music" 
      noFiles={16} 
      color="#FF1CF7"
    />
    <ResourceCard 
      icon={<FaFileAlt />} 
      title="Videos" 
      noFiles={32} 
      color="#36C5F0"
    />
  </div>
);
