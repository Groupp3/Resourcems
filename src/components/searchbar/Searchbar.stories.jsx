import React from 'react';
import SearchBar from './Searchbar';

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
  argTypes: {
    onSearch: { action: 'searched' },
    onChange: { action: 'changed' },
    onClear: { action: 'cleared' }
  }
};

// Base Template
const Template = (args) => <SearchBar {...args} />;

// Default Search Bar
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Search...',
  clearable: true
};

// Loading State
export const Loading = Template.bind({});
Loading.args = {
  placeholder: 'Searching...',
  loading: true
};

// With Error Message
export const WithError = Template.bind({});
WithError.args = {
  placeholder: 'Search...',
  errorMessage: 'Invalid search term',
  clearable: true
};

// Disabled Search Bar
export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Search disabled...',
  disabled: true
};

// Right Icon Position
export const RightIcon = Template.bind({});
RightIcon.args = {
  placeholder: 'Search with right icon...',
  iconPosition: 'right'
};

// Variants Showcase
export const Variants = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <SearchBar placeholder="Default Search" />
    <SearchBar placeholder="Loading Search" loading={true} />
    <SearchBar 
      placeholder="Search with Error" 
      errorMessage="Something went wrong" 
    />
    <SearchBar 
      placeholder="Disabled Search" 
      disabled={true} 
    />
    <SearchBar 
      placeholder="Right Icon Search" 
      iconPosition="right" 
    />
  </div>
);
Variants.parameters = {
  layout: 'padded'
};