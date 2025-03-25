// Modal.stories.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import './Modal.css';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['', 'sm', 'lg', 'xl'],
      description: 'Controls the size of the modal',
    },
    centered: {
      control: 'boolean',
      description: 'Centers the modal vertically',
    },
    scrollable: {
      control: 'boolean',
      description: 'Makes the modal body scrollable',
    },
    animation: {
      control: 'boolean',
      description: 'Enables fade animation',
    },
    backdrop: {
      control: 'select',
      options: [true, false, 'static'],
      description: 'Shows backdrop and controls if clicking outside closes modal',
    },
    fullscreen: {
      control: 'boolean',
      description: 'Makes the modal take up the full screen',
    },
    width: {
      control: 'text',
      description: 'Custom width for the modal',
    },
    closeButtonPosition: {
      control: 'select',
      options: ['header', 'footer', 'both'],
      description: 'Position of the close button',
    },
    showPrimaryButton: {
      control: 'boolean',
      description: 'Show the primary button',
    },
    showSecondaryButton: {
      control: 'boolean',
      description: 'Show the secondary button',
    },
  },
};

// Template for all stories
const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button 
        className="btn btn-primary" 
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>
      
      <Modal 
        {...args} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        onPrimaryClick={() => console.log('Primary button clicked')}
        onShow={() => console.log('Modal is showing')}
        onShown={() => console.log('Modal has shown')}
        onHide={() => console.log('Modal is hiding')}
        onHidden={() => console.log('Modal has hidden')}
      />
    </div>
  );
};

// Basic modal
export const Basic = Template.bind({});
Basic.args = {
  title: 'Basic Modal',
  body: 'This is a basic modal example',
  primaryButtonText: 'Save changes',
  secondaryButtonText: 'Close',
};

// Large modal
export const Large = Template.bind({});
Large.args = {
  ...Basic.args,
  title: 'Large Modal',
  size: 'lg',
};

// Small modal
export const Small = Template.bind({});
Small.args = {
  ...Basic.args,
  title: 'Small Modal',
  size: 'sm',
};

// Centered modal
export const Centered = Template.bind({});
Centered.args = {
  ...Basic.args,
  title: 'Centered Modal',
  centered: true,
};

// Scrollable modal with a lot of content
export const Scrollable = Template.bind({});
Scrollable.args = {
  ...Basic.args,
  title: 'Scrollable Modal',
  scrollable: true,
  body: Array(20).fill('This is a line of text for the scrollable modal example. ').join('\n'),
};

// Custom width modal
export const CustomWidth = Template.bind({});
CustomWidth.args = {
  ...Basic.args,
  title: 'Custom Width Modal',
  width: '800px',
};

// Fullscreen modal
export const Fullscreen = Template.bind({});
Fullscreen.args = {
  ...Basic.args,
  title: 'Fullscreen Modal',
  fullscreen: true,
};

// Static backdrop (clicking outside doesn't close)
export const StaticBackdrop = Template.bind({});
StaticBackdrop.args = {
  ...Basic.args,
  title: 'Static Backdrop Modal',
  backdrop: 'static',
};

// Custom buttons
export const CustomButtons = Template.bind({});
CustomButtons.args = {
  ...Basic.args,
  title: 'Custom Buttons Modal',
  primaryButtonText: 'Complete Action',
  secondaryButtonText: 'Cancel',
  primaryButtonClassName: 'btn-success',
  secondaryButtonClassName: 'btn-danger',
};

// Close button in footer
export const FooterCloseButton = Template.bind({});
FooterCloseButton.args = {
  ...Basic.args,
  title: 'Footer Close Button Modal',
  closeButtonPosition: 'footer',
};

// Custom header and footer content
export const CustomContent = Template.bind({});
CustomContent.args = {
  headerContent: (
    <div className="d-flex justify-content-between align-items-center w-100 px-3 py-2">
      <div className="d-flex align-items-center">
        <div className="bg-primary rounded-circle" style={{ width: '25px', height: '25px', marginRight: '10px' }}></div>
        <h5 className="mb-0">Custom Header</h5>
      </div>
      <button type="button" className="btn-close" aria-label="Close"></button>
    </div>
  ),
  footerContent: (
    <div className="d-flex justify-content-between w-100">
      <button className="btn btn-outline-secondary">Previous</button>
      <div>
        <button className="btn btn-light me-2">Cancel</button>
        <button className="btn btn-success">Proceed</button>
      </div>
    </div>
  ),
  body: 'This modal has custom header and footer content.',
};

// Modal with form
export const FormModal = Template.bind({});
FormModal.args = {
  title: 'Form Modal',
  body: (
    <form>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">Message</label>
        <textarea className="form-control" id="message" rows="3"></textarea>
      </div>
    </form>
  ),
  primaryButtonText: 'Submit',
};

// Children prop example
export const ChildrenProp = Template.bind({});
ChildrenProp.args = {
  title: 'Children Prop Example',
  children: (
    <div>
      <p>This content is passed as children rather than through the body prop.</p>
      <div className="alert alert-info">
        Using the children prop gives you more flexibility in how you structure your modal content.
      </div>
    </div>
  )
};