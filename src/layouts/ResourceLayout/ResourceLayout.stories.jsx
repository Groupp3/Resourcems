import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ResourceLayout from './ResourceLayout';

export default {
  title: 'Layouts/ResourceLayout',
  component: ResourceLayout,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <ResourceLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  // pass any props needed for testing
};
