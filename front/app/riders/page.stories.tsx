import type { Meta, StoryObj } from "@storybook/react";
import { waitFor, within } from "@storybook/testing-library";

import { Provider } from "urql";
import { ChakraProviders } from "@/app/chakra-providers";
import { Container } from "@chakra-ui/react";
import { client } from "@/.storybook/client";
import { handlers } from "@/src/mocks/handlers";

import Page from "./page";

const Template = () => (
  <>
    <Provider value={client}>
      <ChakraProviders>
        <Container maxW="container.lg">
          <Page />
        </Container>
      </ChakraProviders>
    </Provider>
  </>
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

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await waitFor(() => canvas.getByRole("heading", { name: "Tadej Pogacar" }));
};
