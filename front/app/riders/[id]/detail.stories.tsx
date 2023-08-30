import type { Meta, StoryObj } from "@storybook/react";
import { ChakraProviders } from "@/app/chakra-providers";
import { Container } from "@chakra-ui/react";

import Component from "./detail";

const Template = (args) => (
  <>
    <ChakraProviders>
      <Container>
        <Component {...args} />
      </Container>
    </ChakraProviders>
  </>
);

const meta = {
  title: "App/Riders/[id]/detail",
  component: Template,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
