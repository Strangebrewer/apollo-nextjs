import { gql } from "@apollo/client";

export const TRANSACTION_FRAGMENT = gql`
  fragment TransactionFragment on Transaction {
    _id
    amount
    bill {
      _id
      name
    }
    billDate
    category {
      _id
      name
    }
    date
    description
    destination {
      _id
      name
    }
    isIncome
    source {
      _id
      name
    }
    transactionType
  }
`;
