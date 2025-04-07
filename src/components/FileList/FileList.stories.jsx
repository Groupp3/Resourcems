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
    { name: 'Wiz Khalifa - See You Again.mp3', size: '5,265 KB' },
    { name: 'honest.psd', size: '825 KB' },
    { name: 'Screenshot2023.png', size: '121 KB' },
    { name: 'presentation.pdf', size: '2,341 KB' },
    { name: 'assignment.docx', size: '458 KB' },
    { name: 'data.xlsx', size: '231 KB' },
  ],
  onShare: () => alert('Share button clicked'),
};