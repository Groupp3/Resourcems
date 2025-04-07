import React from 'react';
import UploadModal from './UploadModal';

export default {
  title: 'Components/UploadModal',
  component: UploadModal,
};

const Template = (args) => <UploadModal {...args} />;

export const Default = Template.bind({});
Default.args = {
  onClose: () => alert('Modal closed'),
  onSave: (data) => alert(`Form data submitted: ${JSON.stringify(data, null, 2)}`),
};
