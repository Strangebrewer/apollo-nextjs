import { gql } from "@apollo/client";

// Queries:
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      _id
      name
      description
      transactionTemplate {
        _id
        name
      }
    }
  }
`;
