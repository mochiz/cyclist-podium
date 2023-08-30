import { graphql } from "msw";
import getRidersJson from "./getRiders/success.json";
import getRiderJson from "./getRider/success.json";

export const handlers = [
  // query handlers
  graphql.query("getRiders", (req, res, ctx) => {
    return res(ctx.data(getRidersJson.data));
  }),
  graphql.query("getRider", (req, res, ctx) => {
    return res(ctx.data(getRiderJson.data));
  }),
];
