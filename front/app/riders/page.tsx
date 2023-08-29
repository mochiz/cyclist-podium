"use client";

import { gql, useQuery } from "urql";

const getRidersQueryDocument = gql(`
  query getRiders {
    riders {
      id
      fullName
      nationality
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
    <ul>
      {riders.map((rider) => (
        <li key={rider.id}>
          {rider.fullName}: {rider.age}
        </li>
      ))}
    </ul>
  );
};

export default function Page() {
  const riders = Riders();
  return <div>{riders}</div>;
}
