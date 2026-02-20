import "../../webcomponents/ge-autres-demarches/src/ge-autres-demarches.js";
import { html } from "lit";

export default {
  title: "Components/ge-autres-demarches",
  component: "ge-autres-espaces",
  tags: ["autodocs"],
  argTypes: {
    expanded: {
      control: "boolean",
      description: "Whether the panel is expanded",
    },
    title: {
      control: "text",
      description: "Title displayed in the header",
    },
    items: {
      control: "object",
      description: "Array of items to display ({ title, url, target? })",
    },
  },
};

const sampleItems = [
  { title: "Mon espace contribuable", url: "https://www.ge.ch/contribuable" },
  { title: "Mon espace assuré", url: "https://www.ge.ch/assure" },
  { title: "Mon espace parent", url: "https://www.ge.ch/parent", target: "_blank" },
];

const Template = (args) => html`
  <ge-autres-espaces
    ?expanded=${args.expanded}
    title=${args.title}
    .items=${args.items}
  ></ge-autres-espaces>
`;

export const Default = Template.bind({});
Default.args = {
  expanded: true,
  title: "Mes autres espaces",
  items: sampleItems,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  ...Default.args,
  expanded: false,
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  ...Default.args,
  title: "Autres démarches",
};

export const Empty = Template.bind({});
Empty.args = {
  expanded: true,
  title: "Mes autres espaces",
  items: [],
};
