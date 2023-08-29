/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An ISO 8601-encoded date */
  ISO8601Date: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  /** An example field added by the generator */
  testField: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** ライダーリストを返します */
  riders?: Maybe<Array<Rider>>;
};

/** ライダー */
export type Rider = {
  __typename?: 'Rider';
  /** 年齢 */
  age?: Maybe<Scalars['Int']['output']>;
  /** 生年月日 */
  birthday?: Maybe<Scalars['ISO8601Date']['output']>;
  /** 姓 */
  familyName?: Maybe<Scalars['String']['output']>;
  /** 氏名 */
  fullName?: Maybe<Scalars['String']['output']>;
  /** 名 */
  givenName?: Maybe<Scalars['String']['output']>;
  /** ID */
  id: Scalars['ID']['output'];
  /** 国籍 */
  nationality?: Maybe<Scalars['String']['output']>;
};

export type GetRidersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRidersQuery = { __typename?: 'Query', riders?: Array<{ __typename?: 'Rider', id: string, fullName?: string | null, nationality?: string | null, birthday?: any | null, age?: number | null }> | null };


export const GetRidersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getRiders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"riders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"nationality"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"age"}}]}}]}}]} as unknown as DocumentNode<GetRidersQuery, GetRidersQueryVariables>;