import "../../webcomponents/ge-footer-armoiries/src/ge-footer-armoiries.js";
import { html } from "lit";

export default {
  title: "Components/ge-footer-armoiries",
  component: "ge-footer-armoiries",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["light", "dark"],
      description: "SVG color variant",
    },
    width: {
      control: "text",
      description: "Width of the SVG element",
    },
    height: {
      control: "text",
      description: "Height of the SVG element",
    },
  },
};

const Template = (args) => html`
  <ge-footer-armoiries
    variant=${args.variant}
    width=${args.width || ""}
    height=${args.height || ""}
  ></ge-footer-armoiries>
`;

export const Light = Template.bind({});
Light.args = {
  variant: "light",
};

export const Dark = Template.bind({});
Dark.args = {
  variant: "dark",
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  variant: "light",
  width: "200",
};
