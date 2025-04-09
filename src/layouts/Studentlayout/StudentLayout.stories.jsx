import React from "react";
import StudentLayout from "./StudentLayout";
import { MemoryRouter } from "react-router-dom";

// Wrap in MemoryRouter to support `useNavigate`
export default {
  title: "Layouts/StudentLayout",
  component: StudentLayout,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <StudentLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <div>
      <h2>Welcome Student!</h2>
      <p>This is your dashboard. Explore resources and track your learning.</p>
    </div>
  ),
};
