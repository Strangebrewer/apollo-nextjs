import { gql } from "@apollo/client";
import { ACCOUNT_FRAGMENT } from '../fragments/accounts';
import { TRANSACTION_FRAGMENT } from '../fragments/transactions';

// Queries:
export const GET_TRANSACTIONS = gql`
  query GetTransactions($params: TransactionQueryParams) {
    transactions(params: $params) {
      info {
        count
        pages
        next
        prev
      }
      results {
        ...TransactionFragment
      }
    }
  }
  ${TRANSACTION_FRAGMENT}
`;

// Mutations:
export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($transaction: TransactionCreateInput!) {
    createTransaction(transaction: $transaction) {
      ...TransactionFragment
    }
  }
  ${TRANSACTION_FRAGMENT}
`;

export const CREATE_TRANSACTION_FROM_TEMPLATE = gql`
  mutation CreateTransactionFromTemplate($id: ID!) {
    createFromTemplate(id: $id) {
      source {
        ...AccountFragment
      }
      destination {
        ...AccountFragment
      }
      transaction {
      ...TransactionFragment
      }
    }
  }
  ${ACCOUNT_FRAGMENT}
  ${TRANSACTION_FRAGMENT}
`;
