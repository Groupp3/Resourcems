import React from 'react';
import FileList from './FileList';

export default {
  title: 'Components/FileList',
  component: FileList,
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <FileList {...args} />;

export const Default = Template.bind({});
Default.args = {
  files: [
    { name: 'Wiz Khalifa - See You Again.mp3', size: '5,265 KB' },
    { name: 'honest.psd', size: '825 KB' },
    { name: 'Screenshot2023.png', size: '121 KB' },
  ],
  onShare: () => alert('Share button clicked'),
};

export const Empty = Template.bind({});
Empty.args = {
  files: [],
  onShare: () => alert('Share button clicked'),
};

export const ManyFiles = Template.bind({});
ManyFiles.args = {
  files: [
   
      {
        type: 'Folder',
        title: 'Project Documents',
        isPublic: false,
      },
      {
        filename: 'report.pdf',
        contentType: 'application/pdf',
        fileSize: 204800,
        isPublic: true,
      },
      {
        filename: 'budget.xlsx',
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        fileSize: 1024000,
        isPublic: false,
      },
      {
        filename: 'demo.mp4',
        contentType: 'video/mp4',
        fileSize: 10485760,
        isPublic: true,
      },
      {
        filename: 'design.png',
        contentType: 'image/png',
        fileSize: 512000,
        isPublic: true,
      },
      {
        filename: 'notes.txt',
        contentType: 'text/plain',
        fileSize: 1024,
      },
  ],

 
  onShare: () => alert('Share button clicked'),
};