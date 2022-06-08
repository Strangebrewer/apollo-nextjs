import { gql } from "@apollo/client";
import { BILL_FRAGMENT, BILL_TRANSACTIONS_FRAGMENT } from '../fragments/bills';

// Queries:
export const GET_BILLS = gql`
  query GetBills($month: Int!, $year: Int!) {
    bills {
      ...BillFragment
      ...TransactionsFragment
    }
  }
  ${BILL_FRAGMENT}
  ${BILL_TRANSACTIONS_FRAGMENT}
`;

// Mutations:
export const DEFAULT_BILL_PAY = gql`
  mutation DefaultBillPay($id: ID!, $year: Int!, $month: Int!) {
    defaultBillPay(id: $id, year: $year, month: $month) {
      ...BillFragment
      ...TransactionsFragment
    }
  }
  ${BILL_FRAGMENT}
  ${BILL_TRANSACTIONS_FRAGMENT}
`;

export const EDITED_BILL_PAY = gql`
  mutation EditedBillPay($id: ID!, $amount: Int!, $dueDay: Int!, $month: Int!, $year: Int!) {
    editedBillPay(id: $id, amount: $amount, dueDay: $dueDay, month: $month, year: $year) {
      ...BillFragment
      ...TransactionsFragment
    }
  }
  ${BILL_FRAGMENT}
  ${BILL_TRANSACTIONS_FRAGMENT}
`;

export const CREATE_BILL = gql`
  mutation CreateBill($bill: BillCreateInput!, $month: Int!, $year: Int!) {
    createBill(bill: $bill) {
      ...BillFragment
      ...TransactionsFragment
    }
  }
  ${BILL_FRAGMENT}
  ${BILL_TRANSACTIONS_FRAGMENT}
`;

export const UPDATE_BILL = gql`
  mutation UpdateBill($id: ID!, $bill: BillUpdateInput) {
    updateBill(id: $id, bill: $bill) {
      ...BillFragment
    }
  }
  ${BILL_FRAGMENT}
`;

export const DELETE_BILL = gql`
  mutation DeleteBill($id: ID!) {
    deleteBill(id: $id) {
      ...BillFragment
    }
  }
  ${BILL_FRAGMENT}
`;
