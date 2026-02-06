import "../../webcomponents/ge-header/src/ge-header.js";
import { html } from "lit";

export default {
  title: "Components/ge-header",
  component: "ge-header",
  tags: ["autodocs"],
  argTypes: {
    userInfo: {
      control: "object",
      description: "User information object (nom, prenom, email, typeCompte)",
    },
    isMenuOpen: {
      control: "boolean",
      description: "Whether the user dropdown menu is open",
    },
    userInfoLoaded: {
      control: "boolean",
      description: "Whether user info has been loaded",
    },
    maxWidth: {
      control: "text",
      description: "Apply max-width constraint",
    },
  },
};

const Template = (args) => html`
  <ge-header
    .userInfo=${args.userInfo}
    ?is-menu-open=${args.isMenuOpen}
    ?user-info-loaded=${args.userInfoLoaded}
    max-width=${args.maxWidth}
  ></ge-header>
`;

export const Default = Template.bind({});
Default.args = {
  userInfo: {
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@example.com",
    typeCompte: "",
  },
  isMenuOpen: false,
  userInfoLoaded: true,
  maxWidth: "true",
};

export const ProAccount = Template.bind({});
ProAccount.args = {
  ...Default.args,
  userInfo: {
    nom: "Martin",
    prenom: "Marie",
    email: "marie.martin@entreprise.ch",
    typeCompte: "PRO",
  },
};

export const AdminAccount = Template.bind({});
AdminAccount.args = {
  ...Default.args,
  userInfo: {
    nom: "Admin",
    prenom: "Super",
    email: "admin@etat-ge.ch",
    typeCompte: "ADM",
  },
};

export const NotLoaded = Template.bind({});
NotLoaded.args = {
  ...Default.args,
  userInfoLoaded: false,
};
