import InputText from "./InputText";
import "./InputText.css";

export default {
  title: "Components/InputText",
  component: InputText,
  argTypes: {
    type: { control: "text" },
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    placeholder: { control: "text" },
    onChange: { action: "changed" },
  },
};

const Template = (args) => <InputText {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "First Name",
  name: "firstName",
  type: "text",
  placeholder: "Enter your name",
};
