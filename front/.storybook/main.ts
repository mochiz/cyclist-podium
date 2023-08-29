import path from "path";
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  // ../app 以下のファイルを対象にする
  stories: ["../app/**/*.mdx", "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  // @エイリアスを有効にする
  // @see https://storybook.js.org/docs/react/builders/webpack
  async webpackFinal(config) {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../"),
      };
    }
    return config;
  },
};
export default config;
