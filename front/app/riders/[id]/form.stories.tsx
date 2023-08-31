import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "urql";
import { ChakraProviders } from "@/app/chakra-providers";
import { Container } from "@chakra-ui/react";
import { client } from "@/.storybook/client";
import { handlers } from "@/src/mocks/handlers";

import Component from "./form";

const Template = (args) => (
  <>
    <Provider value={client}>
      <ChakraProviders>
        <Container maxW="container.lg">
          <Component {...args} />
        </Container>
      </ChakraProviders>
    </Provider>
  </>
);

const meta = {
  title: "App/Riders/[id]/form",
  component: Template,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers,
    },
  },
  args: {
    rider: {
      id: "1",
      fullName: "Tadej Pogacar",
      familyName: "Pogacar",
      givenName: "Tadej",
      nationality: "Slovenia",
      birthday: "1998-09-23",
      age: "24",
    },
  },
};
