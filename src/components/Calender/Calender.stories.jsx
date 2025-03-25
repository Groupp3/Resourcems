// src/stories/Calendar.stories.jsx
import React from "react";
// src/stories/Calendar.stories.jsx
import MyCalendar from "./Calender"; // Correct the import path based on the actual file location


export default {
  title: "Components/Calendar",
  component: MyCalendar,
  argTypes: {
    value: { control: "date", description: "Selected date" },
    onChange: { action: "date changed", description: "Date selection handler" },
  },
};

const Template = (args) => <MyCalendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: new Date(),
};

export const CustomDate = Template.bind({});
CustomDate.args = {
  value: new Date("2023-06-15"),
};
