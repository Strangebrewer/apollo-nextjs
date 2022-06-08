import { gql } from "@apollo/client";

// Queries:
export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      _id
      accountType
      balance
      description
      name
      status
    }
  }
`;

// Mutations:
