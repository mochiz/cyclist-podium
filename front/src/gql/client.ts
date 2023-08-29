// @see https://formidable.com/open-source/urql/docs/basics/react-preact/
import { Client, cacheExchange, fetchExchange } from "urql";

const client = new Client({
  url: "http://localhost:3000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export default client;
