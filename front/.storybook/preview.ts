import type { Preview } from "@storybook/react";
// @see https://storybook.js.org/addons/msw-storybook-addon
import { initialize, mswLoader } from "msw-storybook-addon";

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};

export default preview;
