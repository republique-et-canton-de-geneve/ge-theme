import "../../webcomponents/select-mes-espaces/src/select-mes-espaces.js";
import { html } from "lit";

export default {
  title: "Components/select-mes-espaces",
  component: "select-mes-espaces",
  tags: ["autodocs"],
  argTypes: {
    links: {
      control: "object",
      description: 'Array of link objects ({ href, label }) and separator strings',
    },
  },
};

const sampleLinks = [
  { href: "/espace-contribuable", label: "Espace contribuable" },
  { href: "/espace-assure", label: "Espace assuré" },
  "separator",
  { href: "/espace-parent", label: "Espace parent" },
  { href: "/espace-employeur", label: "Espace employeur" },
];

const Template = (args) => html`
  <div style="padding: 40px;">
    <select-mes-espaces
      links=${JSON.stringify(args.links)}
    ></select-mes-espaces>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  links: sampleLinks,
};

export const FewLinks = Template.bind({});
FewLinks.args = {
  links: [
    { href: "/espace-contribuable", label: "Espace contribuable" },
    { href: "/espace-assure", label: "Espace assuré" },
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  links: [],
};
