import { graphql } from "msw";
import json from "./getRiders/success.json";

export const handlers = [
  graphql.query("getRiders", (req, res, ctx) => {
    return res(ctx.data(json.data));
  }),
];
