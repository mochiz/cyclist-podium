import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "urql";
import { client } from "@/.storybook/client";
import { handlers } from "@/src/mocks/handlers";

import Page from "./page";

const Template = () => (
  <div>
    <Provider value={client}>
      <Page />
    </Provider>
  </div>
);

const meta = {
  title: "App/Riders",
  component: Template,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers,
    },
  },
};
