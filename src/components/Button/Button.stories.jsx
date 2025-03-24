// Button.stories.jsx
import React from 'react';
import Button from './Button';
import './Button.css';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    componentSubtitle: 'A reusable custom-styled button with Bootstrap-like variants',
  },
  argTypes: {
    label: { control: 'text' },
    variant: { 
      control: { 
        type: 'select', 
        options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'] 
      } 
    },
    size: { 
      control: { 
        type: 'select', 
        options: ['sm', 'md', 'lg'] 
      } 
    },
    outlined: { control: 'boolean' },
    disabled: { control: 'boolean' },
    block: { control: 'boolean' },
    onClick: { action: 'clicked' }
  }
};

// Basic button
export const Default = {
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md'
  }
};

// Small button
export const Small = {
  args: {
    ...Default.args,
    size: 'sm',
    label: 'Small Button'
  }
};

// Large button
export const Large = {
  args: {
    ...Default.args,
    size: 'lg',
    label: 'Large Button'
  }
};

// Outlined button
export const Outlined = {
  args: {
    ...Default.args,
    outlined: true,
    label: 'Outlined Button'
  }
};

// Disabled button
export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
    label: 'Disabled Button'
  }
};

// Block-level button
export const Block = {
  args: {
    ...Default.args,
    block: true,
    label: 'Block Button'
  }
};

// Different variants
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <Button label="Primary" variant="primary" />
    <Button label="Secondary" variant="secondary" />
    <Button label="Success" variant="success" />
    <Button label="Danger" variant="danger" />
    <Button label="Warning" variant="warning" />
    <Button label="Info" variant="info" />
    <Button label="Light" variant="light" />
    <Button label="Dark" variant="dark" />
    <Button label="Link" variant="link" />
  </div>
);

// Outlined variants
export const OutlinedVariants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <Button label="Primary Outline" variant="primary" outlined />
    <Button label="Secondary Outline" variant="secondary" outlined />
    <Button label="Success Outline" variant="success" outlined />
    <Button label="Danger Outline" variant="danger" outlined />
    <Button label="Warning Outline" variant="warning" outlined />
    <Button label="Info Outline" variant="info" outlined />
    <Button label="Light Outline" variant="light" outlined />
    <Button label="Dark Outline" variant="dark" outlined />
  </div>
);