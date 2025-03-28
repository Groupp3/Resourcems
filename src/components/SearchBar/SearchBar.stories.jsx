import React from "react";
import { MemoryRouter } from "react-router-dom";
import SearchBar from "./SearchBar";

export default {
  title: "Components/SearchBar",
  component: SearchBar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    suggestions: { control: "array" },
  },
};

const Template = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  suggestions: ["Home", "About", "Projects", "Contact", "Education"],
};

export const WithManySuggestions = Template.bind({});
WithManySuggestions.args = {
  suggestions: [
    "Dashboard",
    "Settings",
    "Profile",
    "Help",
    "Logout",
    "Notifications",
    "Messages",
  ],
};

export const EmptySuggestions = Template.bind({});
EmptySuggestions.args = {
  suggestions: [],
};
