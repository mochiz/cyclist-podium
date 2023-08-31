import Page from "./page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "urql";
import { fromValue } from "wonka";
import getRidersJson from "@/src/mocks/getRiders/success.json";

const mockClient = {
  executeQuery: jest.fn(() => {
    getRidersJson;
  }),
};

const responseState = {
  executeQuery: () => fromValue(getRidersJson),
};

describe("Page", () => {
  it("renders a heading", async () => {
    render(
      <Provider value={responseState}>
        <Page />
      </Provider>
    );

    const heading: HTMLElement = await screen.getByRole("heading", {
      name: /Tadej Pogacar/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
