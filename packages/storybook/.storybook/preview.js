import { withThemeByClassName } from "@storybook/addon-themes";
import "../../website/static/theme/css/primitives.css";
import "../../website/static/theme/css/light.css";
import "../../website/static/theme/css/dark.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

/** @type {import('@storybook/web-components').Preview} */
const preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
