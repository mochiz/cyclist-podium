import { composeStories } from "@storybook/react";
import { waitFor, within } from "@storybook/testing-library";
import { render } from "@testing-library/react";
import * as stories from "./form.stories";

describe("Form", () => {
  const { Default } = composeStories(stories);

  it("フォームに入力できること", async () => {
    const { container } = render(<Default />);
    Default.play({ canvasElement: container });
  });
});
