import React from "react";
import Header from "./Header";

export default {
  title: "Components/Header",
  component: Header,
  argTypes: {
    theme: {
      control: { type: "select", options: ["light", "dark"] },
    },
  },
};

const Template = ({ theme, ...args }) => {
  return (
    <Header
      {...args}
      backgroundColor={theme === "light" ? "#f8f9fa" : "#132D46"}
      textColor={theme === "light" ? "#212529" : "#ffffff"}
      borderColor={theme === "light" ? "#dee2e6" : "#2d3748"}
    />
  );
};

export const LightHeader = Template.bind({});
LightHeader.args = {
  theme: "light",
};

export const DarkHeader = Template.bind({});
DarkHeader.args = {
  theme: "dark",
};
