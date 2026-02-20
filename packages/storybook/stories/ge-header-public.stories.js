import "../../webcomponents/ge-header-public/src/ge-header-public.js";
import { html } from "lit";

export default {
  title: "Components/ge-header-public",
  component: "ge-header-public",
  tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      control: "text",
      description: "Apply max-width constraint",
    },
  },
};

const Template = (args) => html`
  <ge-header-public max-width=${args.maxWidth}></ge-header-public>
`;

export const Default = Template.bind({});
Default.args = {
  maxWidth: "true",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  maxWidth: "false",
};
