"use client";

import { useQuery } from "urql";
import { graphql } from "@/src/gql";
import Detail from "./detail";
import UpdateRiderForm from "./form";
import { Container } from "@chakra-ui/react";

const getRiderQueryDocument = graphql(`
  query getRider($id: ID!) {
    rider(id: $id) {
      id
      fullName
      familyName
      givenName
      nationality
      birthday
      age
    }
  }
`);

const useGetRiderQuery = (id: string) => {
  const [{ data, fetching, error }] = useQuery({
    query: getRiderQueryDocument,
    variables: { id },
  });
  const rider = data ? data.rider : { id: "" };
  return { rider, fetching, error };
};

export default function Page({ params }: { params: { id: string } }) {
  const { rider, fetching, error } = useGetRiderQuery(params.id);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Container maxW="container.sm" p={10} bg="white">
      <Detail rider={rider} />
    </Container>
  );
}
