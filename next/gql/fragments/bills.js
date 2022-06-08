import { gql } from "@apollo/client";

export const BILL_FRAGMENT = gql`
  fragment BillFragment on Bill {
    _id
    amount
    description
    dueDay
    name
    status
    source {
      _id
      name
    }
    destination {
      _id
      name
    }
    category {
      _id
      name
    }
  }
`;

export const BILL_TRANSACTIONS_FRAGMENT = gql`
  fragment TransactionsFragment on Bill {
    transactions(month: $month, year: $year) {
      pastOne {
        _id
        amount
      }
      pastTwo {
        _id
        amount
      }
      present {
        _id
        amount
      }
    }
  }
`;
