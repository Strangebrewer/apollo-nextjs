import { gql } from "@apollo/client";

export const ACCOUNT_FRAGMENT = gql`
  fragment AccountFragment on Account {
    _id
    accountType
    balance
    description
    name
    status
  }
`;
