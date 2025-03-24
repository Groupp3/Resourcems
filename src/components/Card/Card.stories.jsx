import React from "react";
import Card from "./Card";
import "./Card.css";

export default {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: { control: "text", description: "Card title" },
    description: { control: "text", description: "Card description" },
    image: { control: "text", description: "URL for the card image" },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the card",
    },
    onClick: { action: "clicked", description: "Click event handler" },
    disabled: { control: "boolean", description: "Disable card interactions" },
  },
};

const Template = (args) => <Card {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: "Card Title",
  description: "This is a sample description for the card.",
  image: "",  // Placeholder for the image
  size: "medium",
};

export const WithImage = Template.bind({});
WithImage.args = {
  ...Basic.args,
  image: "https://via.placeholder.com/300",
};

export const LargeCard = Template.bind({});
LargeCard.args = {
  ...Basic.args,
  size: "large",
};

export const SmallCard = Template.bind({});
SmallCard.args = {
  ...Basic.args,
  size: "small",
};

export const DisabledCard = Template.bind({});
DisabledCard.args = {
  ...Basic.args,
  disabled: true,
};
