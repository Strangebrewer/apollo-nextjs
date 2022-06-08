import { gql } from "@apollo/client";

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    _id
    name
    description
    transactionTemplate {
      _id
      name
    }
  }
`;