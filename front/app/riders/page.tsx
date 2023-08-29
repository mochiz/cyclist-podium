"use client";

import { useQuery } from "urql";
import { graphql } from "@/src/gql";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";

const getRidersQueryDocument = graphql(`
  query getRiders {
    riders {
      id
      fullName
      nationality
      birthday
      age
    }
  }
`);

const useGetRidersQuery = () => {
  const [{ data, fetching, error }] = useQuery({
    query: getRidersQueryDocument,
  });
  const riders = data ? data.riders : [];
  return { riders, fetching, error };
};

const Riders = () => {
  const { riders, fetching, error } = useGetRidersQuery();

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <SimpleGrid columns={3} spacing={10}>
      {riders?.map((rider) => (
        <Card key={rider.id}>
          <CardHeader>
            <Heading size="md">{rider.fullName}</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs">Age</Heading>
                <Text fontSize="sm">{rider.age}</Text>
              </Box>
              <Box>
                <Heading size="xs">Birthday</Heading>
                <Text fontSize="sm">{rider.birthday}</Text>
              </Box>
              <Box>
                <Heading size="xs">Nationality</Heading>
                <Text fontSize="sm">{rider.nationality}</Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default function Page() {
  const riders = Riders();
  return <Box>{riders}</Box>;
}
