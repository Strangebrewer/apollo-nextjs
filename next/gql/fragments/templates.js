import { gql } from "@apollo/client";

export const TEMPLATE_FRAGMENT = gql`
  fragment TemplateFragment on Template {
    _id
    amount
    description
    destination {
      _id
      name
    }
    name
    source {
      _id
      name
    }
    transactionType
  }
`;
