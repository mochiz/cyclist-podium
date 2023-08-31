"use client";

import { Rider } from "@/src/gql/graphql";
import { graphql } from "@/src/gql";
import { useMutation } from "urql";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";

const updateRiderMutationDocument = graphql(`
  mutation updateRider($input: UpdateRiderInput!) {
    updateRider(input: $input) {
      rider {
        id
        fullName
        nationality
        birthday
        age
      }
      errors
    }
  }
`);

const UpdateRiderForm = (props: { rider: Rider }) => {
  const { fullName, age, __typename, ...defaultValues } = props.rider;
  const schema = z.object({
    id: z.string(),
    familyName: z.string().min(1, { message: "姓は必須です" }),
    givenName: z.string().min(1, { message: "名は必須です" }),
    nationality: z.string().min(1, { message: "国籍は必須です" }),
    birthday: z.coerce.date({
      required_error: "生年月日は必須です",
      invalid_type_error: "不正な日付です",
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, resolver: zodResolver(schema) });

  const [state, executeMutation] = useMutation(updateRiderMutationDocument);
  function onSubmit(values) {
    const input = {
      ...values,
      birthday: values.birthday.toISOString().replace(/T.*/, ""),
    };
    executeMutation({ input });
  }

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.familyName}>
          <FormLabel htmlFor="familyName">姓</FormLabel>
          <Input id="familyName" {...register("familyName")} />
          <FormErrorMessage>
            {errors.familyName && errors.familyName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.givenName}>
          <FormLabel htmlFor="givenName">名</FormLabel>
          <Input id="givenName" {...register("givenName")} />
          <FormErrorMessage>
            {errors.givenName && errors.givenName.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.birthday}>
          <FormLabel htmlFor="birthday">生年月日</FormLabel>
          <Input id="birthday" type="date" {...register("birthday")} />
          <FormErrorMessage>
            {errors.birthday && errors.birthday.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.nationality}>
          <FormLabel htmlFor="nationality">国籍</FormLabel>
          <Input id="nationality" {...register("nationality")} />
          <FormErrorMessage>
            {errors.nationality && errors.nationality.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>{" "}
    </Box>
  );
};

export default UpdateRiderForm;
