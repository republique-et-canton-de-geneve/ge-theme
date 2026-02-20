import "../../webcomponents/ge-footer/src/ge-footer.js";
import { html } from "lit";

export default {
  title: "Components/ge-footer",
  component: "ge-footer",
  tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      control: "boolean",
      description: "Apply max-width constraint to the footer container",
    },
    contactLink: {
      control: "text",
      description: "URL for the contact link",
    },
    accessibilityLink: {
      control: "text",
      description: "URL for the accessibility link",
    },
    privacyLink: {
      control: "text",
      description: "URL for the privacy link",
    },
    termsLink: {
      control: "text",
      description: "URL for the terms of use link",
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark"],
      description: "Theme variant",
    },
  },
};

const Template = (args) => html`
  <ge-footer
    ?maxwidth=${args.maxWidth}
    contact-link=${args.contactLink}
    accessibility-link=${args.accessibilityLink}
    privacy-link=${args.privacyLink}
    terms-link=${args.termsLink}
    theme=${args.theme}
  ></ge-footer>
`;

export const Default = Template.bind({});
Default.args = {
  maxWidth: true,
  contactLink: "https://www.ge.ch/c/footer-edm-aide",
  accessibilityLink: "https://www.ge.ch/c/footer-edm-accessibilite",
  privacyLink: "https://www.ge.ch/c/footer-edm-confidentialite",
  termsLink: "https://www.ge.ch/c/footer-edm-cgu",
  theme: "light",
};

export const Dark = Template.bind({});
Dark.args = {
  ...Default.args,
  theme: "dark",
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...Default.args,
  maxWidth: false,
};
