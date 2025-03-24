import React from "react";
import Dropdown from "./Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    options: {
      control: "array",
      description: "List of options for the dropdown",
    },
    label: {
      control: "text",
      description: "Text shown when no option is selected",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the dropdown",
    },
    direction: {
      control: "select",
      options: ["down", "up", "left", "right"],
      description: "Dropdown open direction",
    },
    fullWidth: {
      control: "boolean",
      description: "Make dropdown button full width",
    },
    disabled: {
      control: "boolean",
      description: "Disable dropdown interaction",
    },
    showCaret: {
      control: "boolean",
      description: "Show or hide caret icon",
    },
    onSelect: {
      action: "selected",
      description: "Callback function when an option is selected",
    },
  },
};

const Template = (args) => <Dropdown {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  options: ["Option 1", "Option 2", "Option 3"],
  label: "Select an option",
};

export const Large = Template.bind({});
Large.args = {
  ...Basic.args,
  size: "large",
};

export const Small = Template.bind({});
Small.args = {
  ...Basic.args,
  size: "small",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...Basic.args,
  fullWidth: true,
};

export const NoCaret = Template.bind({});
NoCaret.args = {
  ...Basic.args,
  showCaret: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Basic.args,
  disabled: true,
};

export const UpDirection = Template.bind({});
UpDirection.args = {
  ...Basic.args,
  direction: "up",
};

export const LeftDirection = Template.bind({});
LeftDirection.args = {
  ...Basic.args,
  direction: "left",
};

export const RightDirection = Template.bind({});
RightDirection.args = {
  ...Basic.args,
  direction: "right",
};

export const WithOnSelect = Template.bind({});
WithOnSelect.args = {
  ...Basic.args,
  onSelect: (option) => console.log(`Selected: ${option}`),
};
