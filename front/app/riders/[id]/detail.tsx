"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
  Box,
} from "@chakra-ui/react";
import { Rider } from "@/src/gql/graphql";

export default function Detail(props: { rider: Rider }) {
  return (
    <Card key={props.rider.id}>
      <CardHeader>
        <Heading size="md">{props.rider.fullName}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs">Age</Heading>
            <Text fontSize="sm">{props.rider.age}</Text>
          </Box>
          <Box>
            <Heading size="xs">Birthday</Heading>
            <Text fontSize="sm">{props.rider.birthday}</Text>
          </Box>
          <Box>
            <Heading size="xs">Nationality</Heading>
            <Text fontSize="sm">{props.rider.nationality}</Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
