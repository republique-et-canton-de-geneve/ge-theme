import "../../webcomponents/ge-menu/src/ge-menu.js";
import { html } from "lit";

export default {
  title: "Components/ge-menu",
  component: "ge-menu",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

const Template = () => html`
  <div style="position: relative; height: 400px;">
    <ge-menu></ge-menu>
  </div>
`;

export const Default = Template.bind({});
